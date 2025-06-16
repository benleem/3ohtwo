import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import {
	Camera,
	MapView,
	UserLocation,
	CameraRef,
	UserTrackingMode,
	MapViewRef,
} from "@maplibre/maplibre-react-native";
import Pin, { PinInfo } from "./Pin";
import { useSpotContext } from "@/context/SpotsContext";
import { LocationObject } from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MapProps = {
	location: LocationObject | null;
	followUser: boolean;
	setFollowUser: React.Dispatch<React.SetStateAction<boolean>>;
	pin: PinInfo;
	setPin: React.Dispatch<React.SetStateAction<PinInfo>>;
};

export default function Map({
	location,
	followUser,
	setFollowUser,
	pin,
	setPin,
}: MapProps) {
	const { top, bottom } = useSafeAreaInsets();
	const { spot, spotDispatch } = useSpotContext()!;
	const mapViewRef = useRef<MapViewRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);

	// GeoJSON.Feature type is not up to date for some reason
	// using any for now :(
	const handleMapPress = (e: any) => {
		if (pin.show === false) {
			setPin({ coords: e.geometry.coordinates, show: true });
			return;
		}
		setPin({ ...pin, show: false });
		spotDispatch({
			type: "clear_spot",
			payload: {
				...spot,
			},
		});
	};

	useEffect(() => {
		console.log(location);
	}, [location]);

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
				defaultSettings={
					location === null
						? {
								centerCoordinate: [-100, 40],
								zoomLevel: 3,
						  }
						: {
								// centerCoordinate: [
								// 	location.coords.longitude,
								// 	location.coords.latitude,
								// ],
								// zoomLevel: 17,
						  }
				}
				followUserLocation={location !== null ? followUser : false}
				followUserMode={UserTrackingMode.FollowWithHeading}
				onUserTrackingModeChange={(e) => {
					if (!e.nativeEvent.payload.followUserLocation) {
						setFollowUser(false);
					}
				}}
			/>
			<Pin pin={pin} />
			<UserLocation visible />
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
