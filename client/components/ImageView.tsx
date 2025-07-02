import { Image, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSpotContext } from "@/context/SpotsContext";

export default function ImageView() {
	const { currentSpot } = useSpotContext()!;

	return (
		<View
			style={[
				styles.imageContainer,
				currentSpot.image
					? { borderWidth: 0, backgroundColor: "gray" }
					: { borderWidth: 2 },
			]}
		>
			{currentSpot.image ? (
				<Image source={{ uri: currentSpot.image }} style={styles.image} />
			) : (
				<FontAwesome name="picture-o" size={128} color="gray" />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
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
	image: {
		aspectRatio: 1,
		width: "100%",
	},
});
