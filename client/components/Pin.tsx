import { useSpotContext } from "@/context/SpotsContext";
import { ShapeSource, SymbolLayer } from "@maplibre/maplibre-react-native";

const customPin = require("../assets/images/pin.png");

export default function Pin() {
	const { pin } = useSpotContext()!;

	return (
		<ShapeSource
			id="pin-shape-source"
			shape={{
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						id: "pin",
						geometry: {
							type: "Point",
							coordinates: pin.coords,
						},
						properties: {
							// icon: "custom-pin",
							visible: pin.show,
						},
					},
				],
			}}
		>
			<SymbolLayer
				id="pin-symbol-layer"
				filter={["==", ["get", "visible"], true]}
				style={{
					iconImage: customPin,
					iconSize: 0.75,
					iconAllowOverlap: true,
					iconOffset: [0, -24],
				}}
			/>
		</ShapeSource>
	);
}
