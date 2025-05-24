import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function MapBottomSheet() {
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<BottomSheet ref={bottomSheetRef}>
			<BottomSheetView style={styles.contentContainer}>
				<Text>Awesome 🎉</Text>
			</BottomSheetView>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
