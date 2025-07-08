import { Image, View, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useSpotContext } from "@/context/SpotsContext";
import ImageView from "./ImageView";

export default function SpotImagePicker() {
	const { currentSpot, updateSpotForm } = useSpotContext()!;

	const takeImage = () => {};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		// console.log(result);

		if (!result.canceled) {
			updateSpotForm({
				...currentSpot,
				image: result.assets[0].uri,
			});
		}
	};

	const clearImage = () => {
		updateSpotForm({
			...currentSpot,
			image: "",
		});
	};

	return (
		<View style={styles.pickerContainer}>
			<ImageView />
			<View style={styles.buttonsContainer}>
				<Pressable style={styles.button} onPress={pickImage}>
					<Feather name="plus" size={24} color="black" />
				</Pressable>
				{currentSpot.image && (
					<Pressable style={styles.button} onPress={clearImage}>
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
