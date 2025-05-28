import { StyleSheet, Text, View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { PinInfo } from "./Map";
import { use, useEffect, useState } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Coords, useUserLocationContext } from "@/context/UserLocationContext";

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
	const [pinDistance, setPinDistance] = useState<string>("");

	useEffect(() => {
		if (pin.show) {
			expand();
			if (userLoc.enabled && userLoc.coords) {
				const dist = haversine(userLoc.coords, pin.coords, true);
				setPinDistance(dist);
				return;
			}
			return;
		}
		close();
	}, [pin, userLoc]);

	const handleClose = () => {
		setPin({ ...pin, show: false });
	};

	const haversine = (pointA: Coords, pointB: Coords, imperial: boolean) => {
		const RADIUS_MI = 3958.761316;
		const RADIUS_KM = 6371.0087714;
		const MI_TO_FEET = 5280;
		const KM_TO_METERS = 1000;

		// distance between latitudes
		// and longitudes
		let dLat = ((pointB[1] - pointA[1]) * Math.PI) / 180.0;
		let dLon = ((pointB[0] - pointA[0]) * Math.PI) / 180.0;

		// convert to radiansa
		let lat1 = (pointA[1] * Math.PI) / 180.0;
		let lat2 = (pointB[1] * Math.PI) / 180.0;

		// apply formulae
		let a =
			Math.pow(Math.sin(dLat / 2), 2) +
			Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
		let rad;

		// radius of earth
		if (imperial) {
			rad = RADIUS_MI;
		} else {
			rad = RADIUS_KM;
		}

		// calculate
		let c = 2 * Math.asin(Math.sqrt(a));
		let dist = rad * c;
		if (imperial) {
			if (dist < 0.095) {
				dist = dist * MI_TO_FEET;
				return `${dist.toFixed(3)}ft`;
			}
			return `${dist.toFixed(3)}mi`;
		} else {
			if (dist < 0.1) {
				dist = dist * KM_TO_METERS;
				return `${dist.toFixed(3)}m`;
			}
			return `${dist.toFixed(3)}km`;
		}
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
