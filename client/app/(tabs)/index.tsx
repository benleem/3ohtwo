import { StyleSheet, View } from "react-native";
import Map from "@/components/Map";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Tab() {
	return (
		<GestureHandlerRootView style={styles.gestureContainer}>
			<View style={styles.container}>
				<Map />
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	gestureContainer: {
		flex: 1,
		height: 100,
	},
	container: {
		flex: 1,
	},
});
