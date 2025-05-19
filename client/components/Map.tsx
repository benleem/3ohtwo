import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
	Camera,
	MapView,
	MapViewRef,
	UserLocation,
	Location,
	CameraRef,
} from "@maplibre/maplibre-react-native";
import { useUserLocationContext } from "@/context/UserLocationContext";

export default function Map() {
	const { userLoc, updateUserLoc } = useUserLocationContext()!;
	const mapViewRef = useRef<MapViewRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);

	const handleUserLocUpdate = (loc: Location) => {
		updateUserLoc({
			coords: [loc.coords.longitude, loc.coords.latitude],
			zoom: 10,
		});
		cameraRef.current?.setCamera({
			stops: [
				{
					centerCoordinate: [loc.coords.longitude, loc.coords.latitude],
					zoomLevel: 10,
					animationMode: "flyTo",
					animationDuration: 1500,
				},
			],
		});
	};

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
				ref={cameraRef}
				defaultSettings={{
					centerCoordinate: userLoc.coords,
					zoomLevel: userLoc.zoom,
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
