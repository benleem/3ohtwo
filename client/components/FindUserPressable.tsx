import { StyleSheet, Pressable, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Dispatch, SetStateAction } from "react";

type FindUserPressbableProps = {
	setFollowUser: Dispatch<SetStateAction<boolean>>;
};

export default function FindUserPressable({
	setFollowUser,
}: FindUserPressbableProps) {
	return (
		<View style={styles.findUserContainer}>
			<Pressable style={styles.button} onPress={() => setFollowUser(true)}>
				<FontAwesome6 name="location-crosshairs" size={24} color="black" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	findUserContainer: {
		zIndex: 0,
		position: "absolute",
		bottom: 12,
		right: 12,
	},

	button: {
		padding: 8,
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
