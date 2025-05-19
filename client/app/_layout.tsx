import { UserLocationProvider } from "@/context/UserLocationContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
	return (
		<UserLocationProvider>
			<StatusBar hidden={true} />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</UserLocationProvider>
	);
}
