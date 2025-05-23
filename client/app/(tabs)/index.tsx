import { StyleSheet, View } from "react-native";
import Map from "@/components/Map";
import Filter from "@/components/Filter";
import FindUserPressable from "@/components/FindUserPressable";

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
