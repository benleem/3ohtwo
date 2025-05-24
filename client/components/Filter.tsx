import React from "react";
import { StyleSheet, Pressable, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";

type FilterButtonProps = {
	text: string;
	handleOnPress: () => void;
};

function FilterButton({ text, handleOnPress }: FilterButtonProps) {
	return (
		<Pressable
			onPress={handleOnPress}
			disabled={text == "Public" && true}
			// style={styles.button}
			// style={state.disabled ? styles.disabledButton : styles.button}
			style={({ pressed }) => [
				styles.button,
				text == "Public" && {
					opacity: 0.5,
				},
			]}
		>
			<Entypo
				name={text == "Public" ? "network" : "user"}
				size={16}
				color="black"
			/>
			<Text style={styles.buttonText}>{text}</Text>
		</Pressable>
	);
}

export default function Filter() {
	const handlePublicPress = () => {
		Alert.alert("Feature not yet available");
	};
	const handlePersonalPress = () => {
		Alert.alert("Displaying personal markers");
	};

	return (
		<SafeAreaView style={styles.filterContainer}>
			<FilterButton text="Public" handleOnPress={handlePublicPress} />
			<FilterButton text="Personal" handleOnPress={handlePersonalPress} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	filterContainer: {
		zIndex: 0,
		display: "flex",
		flexDirection: "row",
		gap: 12,
		position: "absolute",
		top: 0,
		right: 12,
	},
	button: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 100,
		backgroundColor: "rgba(255, 255, 255, 1)",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.8,
		shadowRadius: 1,
	},
	disabledButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 100,
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 500,
		color: "black",
	},
});
