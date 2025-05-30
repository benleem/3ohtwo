import { StyleSheet, Text, View } from "react-native";

export default function SpotInfo() {
	const handleSubmit = () => {
		console.log("submitted");
	};

	return (
		<View style={styles.spotInfoContainer}>
			<Text style={styles.title}>Spot Info</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	spotInfoContainer: {
		// backgroundColor: "green",
	},
	title: {
		fontSize: 24,
		fontWeight: 700,
		paddingHorizontal: 12,
		paddingBottom: 12,
	},
});
