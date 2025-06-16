import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
	const segment = useSegments();
	// get the current page from the segment
	const page = segment[segment.length - 1];
	// create an array of list pages you want to hide the tab bar in
	const pagesToHideTabBar = ["upload"];

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.babyBlue,
				headerShown: false,
				tabBarShowLabel: true,
				tabBarStyle: {
					// check if the current page is in the list then hide the tab bar
					display: pagesToHideTabBar.includes(page) ? "none" : "flex",
				},
				// tabBarPosition: "right",
				// tabBarVariant: "material",
				tabBarIconStyle: {
					// padding: 5,
					// backgroundColor: "red",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Spots",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={24} name="map" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="upload"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={24} name="cog" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
