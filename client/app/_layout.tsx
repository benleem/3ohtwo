// import { LocationProvider } from "@/context/LocationContext";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<>
			<StatusBar hidden={true} />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}
