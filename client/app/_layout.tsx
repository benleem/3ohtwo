import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserLocationProvider } from "@/context/UserLocationContext";
import { UploadSpotProvider } from "@/context/UploadSpotContext";

export default function Layout() {
	return (
		<GestureHandlerRootView style={styles.gestureContainer}>
			<UserLocationProvider>
				<UploadSpotProvider>
					<StatusBar style="dark" />
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</UploadSpotProvider>
			</UserLocationProvider>
		</GestureHandlerRootView>
	);
}
const styles = StyleSheet.create({
	gestureContainer: {
		flex: 1,
		height: 100,
	},
});
