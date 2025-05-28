import React from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

type MapBottomSheetProps = {
	children: React.ReactNode;
};

export default function MapBottomSheet({ children }: MapBottomSheetProps) {
	return (
		<BottomSheet
			// ref={bottomSheetRef}
			handleStyle={{ paddingVertical: 12 }}
			// onChange={handleSheetChanges}
			// enablePanDownToClose
			index={-1}
		>
			<BottomSheetView style={styles.contentContainer}>
				{children}
			</BottomSheetView>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});
