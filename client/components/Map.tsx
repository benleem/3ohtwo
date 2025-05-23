import React, { useRef } from "react";
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
import Filter from "./Filter";
import FindUserPressable from "./FindUserPressable";

export default function Map() {
	const { userLoc, dispatch } = useUserLocationContext()!;
	const mapViewRef = useRef<MapViewRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);

	const handleUserLocUpdate = (loc: Location) => {
		let zoom = 16;
		let coords: [number, number] = [loc.coords.longitude, loc.coords.latitude];
		dispatch({
			type: "update_location",
			payload: {
				isEnabled: true,
				coords,
				zoom,
			},
		});
		cameraRef.current?.setCamera({
			stops: [
				{
					centerCoordinate: coords,
					zoomLevel: zoom,
					animationMode: "flyTo",
					animationDuration: 2000,
				},
			],
		});
	};

	return (
		<>
			<Filter />
			{userLoc.isEnabled && <FindUserPressable cameraRef={cameraRef} />}
			<MapView
				ref={mapViewRef}
				style={styles.map}
				mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
				attributionPosition={{ top: 0, left: 12 }}
				compassEnabled={true}
				compassViewMargins={{ x: 12, y: 12 }}
				compassViewPosition={2}
				localizeLabels={true}
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
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
