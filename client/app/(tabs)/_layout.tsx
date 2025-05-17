import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "blue",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="map" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="cog" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
