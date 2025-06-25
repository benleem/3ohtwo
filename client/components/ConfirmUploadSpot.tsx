import { StyleSheet, Text, View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { useEffect, useMemo } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { haversine } from "@/helpers/utils";
import { Colors } from "@/constants/Colors";
import { DEFAULT_PIN, PinInfo, useSpotContext } from "@/context/SpotsContext";
import { Location } from "@maplibre/maplibre-react-native";

type ConfirmUploadSpotProps = {
	userLoc: Location | null;
};

export default function ConfirmUploadSpot({ userLoc }: ConfirmUploadSpotProps) {
	const { pin, setPin, clearSpotForm } = useSpotContext()!;
	const { close, expand } = useBottomSheet();
	const pinDistance = useMemo(() => {
		if (userLoc !== null && pin.show) {
			let distance = haversine(
				[userLoc.coords.longitude, userLoc.coords.latitude],
				pin.coords,
				true
			);
			return distance;
		}
	}, [pin, userLoc]);

	const handleClose = () => {
		clearSpotForm();
	};

	useEffect(() => {
		if (pin.show) {
			expand();
			return;
		}
		close();
	}, [pin]);

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
