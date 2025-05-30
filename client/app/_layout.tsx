import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserLocationProvider } from "@/context/UserLocationContext";

export default function Layout() {
	return (
		<GestureHandlerRootView style={styles.gestureContainer}>
			<UserLocationProvider>
				<StatusBar style="dark" />
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
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
