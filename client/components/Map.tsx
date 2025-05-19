import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
	Camera,
	MapView,
	MapViewRef,
	UserLocation,
	Location,
} from "@maplibre/maplibre-react-native";
// import { useLocationContext } from "@/context/LocationContext";

type DefaultLocation = {
	coords: [number, number];
	zoom: number;
};

export default function Map() {
	// const { location, updateLocation } = useLocationContext()!;
	const [defaultLoc, setDefaultLoc] = useState<DefaultLocation>({
		coords: [-100, 40],
		zoom: 3,
	});
	const mapViewRef = useRef<MapViewRef | null>(null);

	const handleUserLocUpdate = (loc: Location) => {
		setDefaultLoc({
			coords: [loc.coords.longitude, loc.coords.latitude],
			zoom: 10,
		});
	};

	useEffect(() => {
		// return () => {
		// 	console.log(mapViewRef.current?.getCenter());
		// 	console.log(mapViewRef.current?.getZoom());
		// };
	}, []);

	return (
		<MapView
			ref={mapViewRef}
			style={styles.map}
			mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
			attributionPosition={{ top: 0, left: 8 }}
			compassEnabled={true}
			compassViewMargins={{ x: 8, y: 8 }}
			compassViewPosition={2}
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
			<Camera
				defaultSettings={{
					centerCoordinate: defaultLoc.coords,
					zoomLevel: defaultLoc.zoom,
				}}
			/>
			<UserLocation
				visible={true}
				showsUserHeadingIndicator={true}
				onUpdate={(loc: Location) => handleUserLocUpdate(loc)}
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
