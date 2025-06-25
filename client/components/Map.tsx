import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import {
	Camera,
	MapView,
	UserLocation,
	CameraRef,
	UserTrackingMode,
	MapViewRef,
	Location,
} from "@maplibre/maplibre-react-native";
import Pin from "./Pin";
import { DEFAULT_PIN, PinInfo, useSpotContext } from "@/context/SpotsContext";
import { LocationObject } from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MapProps = {
	location: LocationObject | null;
	setUserLoc: React.Dispatch<React.SetStateAction<Location | null>>;
	followUser: boolean;
	setFollowUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Map({
	location,
	setUserLoc,
	followUser,
	setFollowUser,
}: MapProps) {
	const { top } = useSafeAreaInsets();
	const { pin, clearSpotForm, setPin } = useSpotContext()!;
	const mapViewRef = useRef<MapViewRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);

	// GeoJSON.Feature type is not up to date for some reason
	// using any for now :(
	const handleMapPress = (e: any) => {
		if (pin.show === false) {
			setPin({ coords: e.geometry.coordinates, show: true });
			return;
		}
		clearSpotForm();
	};

	return (
		<MapView
			ref={mapViewRef}
			style={styles.map}
			mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
			attributionPosition={
				Platform.OS === "android"
					? { top: top, left: 12 }
					: { top: 0, left: 12 }
			}
			compassEnabled={true}
			compassViewMargins={{ x: 12, y: 12 }}
			compassViewPosition={2}
			localizeLabels={true}
			onPress={(e) => handleMapPress(e)}
		>
			<Camera
				ref={cameraRef}
				defaultSettings={{
					centerCoordinate: [-100, 40],
					zoomLevel: 3,
				}}
				followUserLocation={location !== null ? followUser : false}
				followUserMode={UserTrackingMode.FollowWithHeading}
				onUserTrackingModeChange={(e) => {
					if (!e.nativeEvent.payload.followUserLocation) {
						setFollowUser(false);
					}
				}}
			/>
			<Pin pin={pin} />
			<UserLocation visible onUpdate={(loc: Location) => setUserLoc(loc)} />
		</MapView>
	);
}

const styles = StyleSheet.create({
	map: {
		zIndex: -1,
		width: "100%",
		height: "100%",
	},
});
