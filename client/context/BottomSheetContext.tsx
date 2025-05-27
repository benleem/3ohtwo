import React, { createContext, useCallback, useContext, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

type MapBottomSheetContextProps = {
	bottomSheetRef: React.RefObject<BottomSheet | null>;
};

const MapBottomSheetContext = createContext<MapBottomSheetContextProps | null>(
	null
);

export const useMapBottomSheetContext = () => useContext(MapBottomSheetContext);

export const MapBottomSheetProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<MapBottomSheetContext.Provider value={{ bottomSheetRef }}>
			<BottomSheet
				handleStyle={{ paddingVertical: 12 }}
				ref={bottomSheetRef}
				onChange={handleSheetChanges}
				// index={-1}
			>
				{children}
			</BottomSheet>
		</MapBottomSheetContext.Provider>
	);
};
