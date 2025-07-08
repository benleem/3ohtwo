import { DEFAULT_PIN, Spot, useSpotContext } from "@/context/SpotsContext";
import {
	CircleLayer,
	ShapeSource,
	SymbolLayer,
} from "@maplibre/maplibre-react-native";
import { useMemo } from "react";
import { Alert } from "react-native";
import { pinchHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/PinchGestureHandler";

const customPin = require("../assets/images/pin.png");

export default function Markers() {
	const { pin, spots, updateSpotForm, setPin } = useSpotContext()!;
	const spotMarkers = useMemo(() => {
		let spotFeatureArray: any[] = [];
		// need to optimize, don't want to iterate over whole spots array everytime it changes
		spots.forEach((spot, i) => {
			spotFeatureArray.push({
				type: "Feature",
				id: `spot-${spot.id}`,
				geometry: {
					type: "Point",
					coordinates: spot.coords,
				},
				properties: {
					dbId: spot.id,
				},
			});
		});
		return spotFeatureArray;
	}, [spots]);

	return (
		<ShapeSource
			id="spot-shape-source"
			cluster
			clusterRadius={50}
			clusterMaxZoomLevel={17}
			shape={{
				type: "FeatureCollection",
				features: spotMarkers,
			}}
			onPress={(event) => {
				if (pin.show) {
					setPin(DEFAULT_PIN);
				}
				event.features.forEach((feature) => {
					if (feature.properties && feature.properties.dbId) {
						let spotId = feature.properties.dbId;
						let selectedSpot = spots.filter((spot) => spot.id === spotId)[0];
						updateSpotForm(selectedSpot);
					}
				});
			}}
		>
			<SymbolLayer
				id="spot-cluster-count"
				filter={["has", "point_count"]}
				style={{
					textField: "{point_count_abbreviated}",
					textFont: ["Noto Sans Regular"],
					textSize: 18,
				}}
			/>
			<CircleLayer
				id="spot-clusters"
				filter={["has", "point_count"]}
				belowLayerID="spot-cluster-count"
				style={{
					circlePitchAlignment: "map",
					circleColor: [
						"step",
						["get", "point_count"],
						"#51bbd6",
						100,
						"#f1f075",
						750,
						"#f28cb1",
					],
					circleRadius: ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
					circleOpacity: 0.84,
					circleStrokeWidth: 2,
					circleStrokeColor: "white",
				}}
			/>
			<SymbolLayer
				id="unclustered-spot"
				filter={["!", ["has", "point_count"]]}
				style={{
					iconImage: customPin,
					iconAllowOverlap: true,
					iconSize: 0.75,
					iconOffset: [0, -24],
					iconColor: "blue",
				}}
			/>
		</ShapeSource>
	);
}
