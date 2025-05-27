import React from "react";
import { StyleSheet } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { MapBottomSheetProvider } from "@/context/BottomSheetContext";

type MapBottomSheetProps = {
	children: React.ReactNode;
};

export default function MapBottomSheet({ children }: MapBottomSheetProps) {
	return (
		<MapBottomSheetProvider>
			<BottomSheetView style={styles.contentContainer}>
				{children}
			</BottomSheetView>
		</MapBottomSheetProvider>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});
