import { StyleSheet, Text, View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { PinInfo } from "./Map";
import { useEffect, useMemo, useState } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Coords, useUserLocationContext } from "@/context/UserLocationContext";
import { haversine } from "@/helpers/utils";

type ConfirmUploadSpotProps = {
	pin: PinInfo;
	setPin: React.Dispatch<React.SetStateAction<PinInfo>>;
};

export default function ConfirmUploadSpot({
	pin,
	setPin,
}: ConfirmUploadSpotProps) {
	const { userLoc } = useUserLocationContext()!;
	const { close, expand } = useBottomSheet()!;
	const pinDistance = useMemo(() => {
		if (userLoc.enabled && userLoc.coords && pin.show) {
			return haversine(userLoc.coords, pin.coords, true);
		}
		return "";
	}, [pin, userLoc]);

	useEffect(() => {
		if (pin.show) {
			expand();
			return;
		}
		close();
	}, [pin]);

	const handleClose = () => {
		setPin({ ...pin, show: false });
	};

	return (
		<View style={styles.confirmWrapper}>
			<View style={styles.confirmContainer}>
				<Text style={styles.title}>Add Spot?</Text>
				<View style={styles.buttonsContainer}>
					<Link
						style={styles.confirmButton}
						href={{
							pathname: "/upload",
							params: { location: pin.coords },
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
		backgroundColor: "gray",
		borderRadius: 18,
	},
	distanceText: {
		color: "gray",
		display: "flex",
		fontSize: 12,
	},
});
