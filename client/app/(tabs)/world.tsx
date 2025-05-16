import { View, Text, StyleSheet } from "react-native";
import Map from "@/components/Map";

export default function Tab() {
	return (
		<View style={styles.container}>
			<Map />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
