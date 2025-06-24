import { Coords } from "@/context/SpotsContext";
import { ShapeSource, SymbolLayer } from "@maplibre/maplibre-react-native";

export type PinInfo = {
	coords: Coords;
	show: boolean;
};

type PinProps = {
	pin: PinInfo;
};

const customPin = require("../assets/images/pin.png");

export default function Pin({ pin }: PinProps) {
	return (
		<ShapeSource
			id="pin-shape-source"
			shape={{
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: {
							id: "pin",
							// icon: "custom-pin",
							visible: pin.show,
						},
						geometry: {
							type: "Point",
							coordinates: pin.coords,
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
