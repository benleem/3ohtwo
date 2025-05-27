import { StyleSheet, View } from "react-native";
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
	},
});
