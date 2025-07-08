import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

type MapBottomSheetContextProps = {
	visible: boolean;
};

const MapBottomSheetContext = createContext<MapBottomSheetContextProps | null>(
	null
);

export const useMapBottomSheetContext = () => useContext(MapBottomSheetContext);

export const MapBottomSheetProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [visible, setVisible] = useState<boolean>(false);

	const handleSheetChanges = (index: number) => {
		if (index === -1) {
			setVisible(false);
			return;
		}
		setVisible(true);
	};

	// useEffect(() => {
	// 	console.log(visible);
	// }, [visible]);

	return (
		<MapBottomSheetContext.Provider value={{ visible }}>
			<BottomSheet
				// ref={bottomSheetRef}
				handleStyle={{ paddingVertical: 12 }}
				onChange={handleSheetChanges}
				index={-1}
			>
				<BottomSheetView style={styles.contentContainer}>
					{children}
				</BottomSheetView>
			</BottomSheet>
		</MapBottomSheetContext.Provider>
	);
};

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
		// alignItems: "center",
	},
});
