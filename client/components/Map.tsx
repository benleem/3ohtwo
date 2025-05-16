import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { MapView, MapViewRef } from "@maplibre/maplibre-react-native";
import { useLocationContext } from "@/context/LocationContext";

export default function Map() {
	const { location } = useLocationContext()!;
	const mapViewRef = useRef<MapViewRef | null>(null);

	useEffect(() => {
		console.log(location);
	});

	return (
		<MapView
			ref={mapViewRef}
			style={styles.map}
			mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
			localizeLabels={true}
		/>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
