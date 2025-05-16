import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { MapView, MapViewRef } from "@maplibre/maplibre-react-native";

type MapProps = {
	initialLocation: [number, number];
};

export default function Map({ initialLocation }: MapProps) {
	const mapViewRef = useRef<MapViewRef | null>(null);

	useEffect(() => {
		console.log("Hello");
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
