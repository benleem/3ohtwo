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

// import React, { useMemo } from "react";
// import { Dimensions, Pressable, StyleSheet } from "react-native";
// import Animated, {
// 	Extrapolation,
// 	interpolate,
// 	useAnimatedStyle,
// } from "react-native-reanimated";
// // import { ShowcaseLabel, useShowcaseTheme } from "@gorhom/showcase-template";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import { SEARCH_HANDLE_HEIGHT } from "../../components/searchHandle";
// // import { LOCATION_DETAILS_HEIGHT } from "../locationDetails";
// import { FontAwesome6 } from "@expo/vector-icons";

// type FindUserPressbableProps = {
// 	setFollowUser: React.Dispatch<React.SetStateAction<boolean>>;
// 	animatedPosition: Animated.SharedValue<number>;
// 	animatedIndex: Animated.SharedValue<number>;
// };

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// export default function FindUserPressable({
// 	setFollowUser,
// 	animatedIndex,
// 	animatedPosition,
// }: FindUserPressbableProps) {
// 	// hooks
// 	const { bottom: bottomSafeArea } = useSafeAreaInsets();

// 	// styles
// 	const lockedYPosition = useMemo(
// 		() =>
// 			SCREEN_HEIGHT -
// 			// SEARCH_HANDLE_HEIGHT -
// 			// LOCATION_DETAILS_HEIGHT -
// 			bottomSafeArea,
// 		[bottomSafeArea]
// 	);
// 	const containerAnimatedStyle = useAnimatedStyle(
// 		() => ({
// 			transform: [
// 				{
// 					translateY:
// 						animatedPosition.value > lockedYPosition
// 							? animatedPosition.value - 24
// 							: lockedYPosition - 24,
// 				},
// 				{
// 					scale: interpolate(
// 						animatedIndex.value,
// 						[1, 1.25],
// 						[1, 0],
// 						Extrapolation.CLAMP
// 					),
// 				},
// 			],
// 		}),
// 		[lockedYPosition]
// 	);
// 	const containerStyle = useMemo(
// 		() => [
// 			styles.container,
// 			// { backgroundColor: colors.secondaryCard },
// 			containerAnimatedStyle,
// 		],
// 		[
// 			,
// 			// colors.secondaryCard
// 			containerAnimatedStyle,
// 		]
// 	);
// 	return (
// 		<Animated.View style={containerStyle}>
// 			<Pressable onPress={() => setFollowUser(true)}>
// 				<FontAwesome6 name="location-crosshairs" size={24} color="black" />{" "}
// 			</Pressable>
// 		</Animated.View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		position: "absolute",
// 		right: 12,
// 		top: 0,
// 		padding: 2,
// 		marginTop: 0,
// 		borderRadius: 4,
// 	},
// 	label: {
// 		fontSize: 16,
// 		lineHeight: 16,
// 	},
// });
