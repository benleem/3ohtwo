import { StyleSheet, Text, View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { useMapBottomSheetContext } from "@/context/BottomSheetContext";

export default function ConfirmUploadSpot() {
	const { bottomSheetRef } = useMapBottomSheetContext()!;

	return (
		<View style={styles.confirmContainer}>
			<Text style={styles.title}>Add Spot?</Text>
			<View style={styles.buttonsContainer}>
				<Link
					style={styles.confirmButton}
					href={{
						pathname: "/upload",
						params: { location: [40, 100] },
					}}
					suppressHighlighting
				>
					<Feather name="check" size={18} color="black" />
				</Link>
				<Pressable
					style={styles.confirmButton}
					onPress={() => bottomSheetRef.current?.close()}
				>
					<Feather name="x" size={18} color="black" />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	confirmContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		marginBottom: 12,
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
});
