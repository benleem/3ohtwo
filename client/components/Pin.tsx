import { ShapeSource, SymbolLayer } from "@maplibre/maplibre-react-native";
import { PinInfo } from "./Map";

type PinProps = {
	pin: PinInfo;
};

export default function Pin({ pin }: PinProps) {
	return (
		<ShapeSource
			id="pin-shape-source"
			shape={{
				type: "Feature",
				properties: {
					id: "pin", // Unique ID for the feature
					icon: "custom-pin", // Reference for the SymbolLayer
					// visible: pin.show, // Custom property to control visibility via filter
				},
				geometry: {
					type: "Point",
					coordinates: pin.coords,
				},
			}}
		>
			{/* SymbolLayer styles and renders the pin */}
			<SymbolLayer
				id="pin-symbol-layer"
				// Filter features based on the 'visible' property
				// filter={["==", ["get", "visible"], true]}
				style={{
					visibility: "visible",
					// If using an image:
					// iconImage: pinIcon, // Reference the image registered with MapLibreGL.Images
					// iconSize: 0.5, // Adjust as needed
					// iconAllowOverlap: true,
					// If using a default circle as a placeholder:
					// (You'd typically use a CircleLayer for this, but SymbolLayer can make simple circles too)
					// For better circles, use MapLibreGL.CircleLayer
					// This is a hacky way to make a circle with SymbolLayer if no icon:
					// iconImage: "placeholder-for-text-or-none", // Needs an actual image or use text field
					textField: "HELO", // Use an emoji or character as the pin
					textSize: 48,
					textColor: "blue",
					textAllowOverlap: true,
					iconAllowOverlap: true,
					textOffset: [0, -1.5], // Adjust offset to make emoji appear above coordinate
				}}
			/>
		</ShapeSource>
		// <MarkerView coordinate={pin.coords}>
		// 	{/* <View style={styles.pinContainer}> */}
		// 	<MaterialIcons
		// 		style={!pin.show ? { opacity: 0 } : { opacity: 1 }}
		// 		name="location-pin"
		// 		size={48}
		// 		color="red"
		// 	/>
		// 	{/* </View> */}
		// </MarkerView>
	);
}
