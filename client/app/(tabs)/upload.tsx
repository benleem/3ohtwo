import UploadSpot from "@/components/UploadSpot";
import { View, Text, StyleSheet } from "react-native";

export default function Tab() {
	return (
		<View style={styles.container}>
			<UploadSpot />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
