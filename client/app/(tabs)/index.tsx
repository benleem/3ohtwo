import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "@/components/Map";
import Filter from "@/components/Filter";

export default function Tab() {
	return (
		<View style={styles.container}>
			<Filter />
			<Map />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
