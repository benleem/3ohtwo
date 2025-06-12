import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UploadSpotProvider } from "@/context/UploadSpotContext";

export default function Layout() {
	return (
		<GestureHandlerRootView style={styles.gestureContainer}>
			<UploadSpotProvider>
				<StatusBar style="dark" />
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</UploadSpotProvider>
		</GestureHandlerRootView>
	);
}
const styles = StyleSheet.create({
	gestureContainer: {
		flex: 1,
		height: 100,
	},
});
