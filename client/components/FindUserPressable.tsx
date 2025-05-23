import { StyleSheet, Text, Pressable, View } from "react-native";
import { CameraRef } from "@maplibre/maplibre-react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useUserLocationContext } from "@/context/UserLocationContext";

type FindUserPressbableProps = {
	cameraRef: React.RefObject<CameraRef | null>;
};

export default function FindUserPressable({
	cameraRef,
}: FindUserPressbableProps) {
	const { userLoc, updateUserLoc } = useUserLocationContext()!;

	const panToUser = () => {
		let zoom = userLoc.zoom;
		let coords = userLoc.coords;
		// set camera with same attributes on iOS, workaround
		// https://github.com/maplibre/maplibre-react-native/issues/571
		cameraRef.current?.setCamera({});
		cameraRef.current?.setCamera({
			stops: [
				{
					centerCoordinate: coords,
					zoomLevel: 16,
					animationMode: "flyTo",
					animationDuration: 2000,
				},
			],
		});
	};

	return (
		<View style={styles.findUserContainer}>
			<Pressable style={styles.button} onPress={panToUser}>
				<FontAwesome6 name="location-crosshairs" size={24} color="black" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	findUserContainer: {
		zIndex: 1,
		position: "absolute",
		bottom: 12,
		right: 12,
	},

	button: {
		padding: 10,
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
});
