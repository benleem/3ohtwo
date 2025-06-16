import { StyleSheet, Text, View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { haversine } from "@/helpers/utils";
import { Colors } from "@/constants/Colors";
import { PinInfo } from "./Pin";
import * as Location from "expo-location";
import { useSpotContext } from "@/context/SpotsContext";

type ConfirmUploadSpotProps = {
	pin: PinInfo;
	setPin: React.Dispatch<React.SetStateAction<PinInfo>>;
};

export default function ConfirmUploadSpot({
	pin,
	setPin,
}: ConfirmUploadSpotProps) {
	const { spot, spotDispatch } = useSpotContext()!;
	const { close, expand } = useBottomSheet()!;
	const [locationSub, setLocationSub] =
		useState<Location.LocationObject | null>(null);
	const pinDistance = useMemo(() => {
		if (locationSub !== null && pin.show) {
			return haversine(
				[locationSub.coords.longitude, locationSub.coords.latitude],
				pin.coords,
				true
			);
		}
		return "Can't find user";
	}, [pin, locationSub]);

	const handleClose = () => {
		setPin({ ...pin, show: false });
		spotDispatch({
			type: "clear_spot",
			payload: {
				...spot,
			},
		});
	};

	function subCallback(location: Location.LocationObject) {
		console.log(location);
		setLocationSub(location);
	}

	function subErrorHandler(error: string) {
		console.log(error);
	}

	useEffect(() => {
		if (pin.show) {
			expand();
			return;
		}
		close();
	}, [pin]);

	useEffect(() => {
		(async () => {
			const subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.Highest,
					timeInterval: 1000,
					distanceInterval: 1,
				},
				subCallback,
				subErrorHandler
			);
			return () => subscription.remove();
		})();
	}, []);

	return (
		<View style={styles.confirmWrapper}>
			<View style={styles.confirmContainer}>
				<Text style={styles.title}>Add Spot?</Text>
				<View style={styles.buttonsContainer}>
					<Link
						style={styles.confirmButton}
						href={{
							pathname: "/upload",
						}}
						suppressHighlighting
					>
						<Feather name="check" size={18} color="black" />
					</Link>
					<Pressable style={styles.confirmButton} onPress={handleClose}>
						<Feather name="x" size={18} color="black" />
					</Pressable>
				</View>
			</View>
			<Text style={styles.distanceText}>{pinDistance}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	confirmWrapper: {
		paddingHorizontal: 12,
		paddingBottom: 12,
	},
	confirmContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 24,
		fontWeight: 500,
	},
	buttonsContainer: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		gap: 12,
	},
	confirmButton: {
		padding: 4,
		backgroundColor: Colors.lightGray,
		borderRadius: 18,
	},
	distanceText: {
		color: "gray",
		display: "flex",
		fontSize: 12,
	},
});
