import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FindUserPressable from "./FindUserPressable";

type MapBottomSheetProps = {
	children: React.ReactNode;
};

export default function MapBottomSheet({ children }: MapBottomSheetProps) {
	return (
		<BottomSheet
			// ref={bottomSheetRef}
			style={[
				styles.bottomSheetContainer,
				// visible ? { shadowOpacity: 0.4 } : { shadowOpacity: 0 },
			]}
			handleStyle={{ paddingVertical: 12 }}
			// enablePanDownToClose
			// onChange={(index) => handleSheetChanges(index)}
			// onClose={() => setVisible(false)}
			index={-1}
		>
			<BottomSheetView style={styles.contentContainer}>
				{children}
			</BottomSheetView>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	bottomSheetContainer: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -1,
		},
		shadowOpacity: 0.4,
		shadowRadius: 5,
	},
	contentContainer: {
		flex: 1,
	},
});
