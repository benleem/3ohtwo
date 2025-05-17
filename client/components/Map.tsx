import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
	Camera,
	MapView,
	MapViewRef,
	RegionPayload,
} from "@maplibre/maplibre-react-native";
// import { useLocationContext } from "@/context/LocationContext";

// type DefaultLocation = {
// 	coords: [number, number];
// 	zoom: number;
// };

export default function Map() {
	// const [defaultLoc, setDefaultLoc] = useState<>(mapViewRef);
	// const { location, updateLocation } = useLocationContext()!;
	const mapViewRef = useRef<MapViewRef | null>(null);

	// const handleRegionDidChange: any() => {return 4}

	// useEffect(() => {
	// 	return () => {
	// 		console.log(mapViewRef.current?.getCenter());
	// 		console.log(mapViewRef.current?.getZoom());
	// 	};
	// }, []);

	return (
		<MapView
			ref={mapViewRef}
			style={styles.map}
			mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
			attributionEnabled={false}
			compassEnabled={true}
			localizeLabels={true}
			// onRegionDidChange={(
			// 	feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>
			// ) => {
			// 	let loc = feature.properties.visibleBounds[1];
			// 	let zoom = feature.properties.zoomLevel;
			// 	console.log(`loc: ${loc}, zoom: ${zoom}`);
			// 	updateLocation([]);
			// 	let mapCenter = mapViewRef.current?.getCenter();
			// 	console.log(mapCenter);
			// }}
		>
			{/* <Camera centerCoordinate={location} /> */}
			<Camera
				defaultSettings={{
					centerCoordinate: [-100, 40],
					zoomLevel: 3,
				}}
			/>
		</MapView>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
