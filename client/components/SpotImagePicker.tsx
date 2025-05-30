import { useState } from "react";
import { Button, Image, View, StyleSheet, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function SpotImagePicker() {
	const [image, setImage] = useState<string | null>(null);

	const takeImage = () => {};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.pickerContainer}>
			<View
				style={[
					styles.imageContainer,
					image ? { borderWidth: 0 } : { borderWidth: 2 },
				]}
			>
				{image ? (
					<Image source={{ uri: image }} style={styles.image} />
				) : (
					<FontAwesome name="picture-o" size={128} color="gray" />
				)}
			</View>
			<View style={styles.buttonsContainer}>
				<Pressable style={styles.button} onPress={pickImage}>
					<Feather name="plus" size={24} color="black" />
				</Pressable>
				{image && (
					<Pressable style={styles.button} onPress={() => setImage(null)}>
						<Feather name="x" size={24} color="black" />
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	pickerContainer: {
		position: "relative",
		marginHorizontal: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	imageContainer: {
		aspectRatio: 1,
		width: "100%",
		alignItems: "center",
		overflow: "hidden",
		justifyContent: "center",
		borderColor: "gray",
		borderStyle: "dashed",
		borderRadius: 12,
	},
	buttonsContainer: {
		position: "absolute",
		top: 0,
		right: 8,
		paddingVertical: 8,
		height: "100%",
		display: "flex",
		justifyContent: "space-between",
	},
	button: {
		padding: 6,
		backgroundColor: "white",
		borderRadius: 24,
	},
	image: {
		aspectRatio: 1,
		width: "100%",
	},
});
