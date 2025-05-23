import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
	Camera,
	MapView,
	UserLocation,
	Location,
	CameraRef,
	UserTrackingMode,
	MapViewRef,
} from "@maplibre/maplibre-react-native";
import { useUserLocationContext } from "@/context/UserLocationContext";
import Filter from "./Filter";
import FindUserPressable from "./FindUserPressable";

export default function Map() {
	const { userLoc, dispatch } = useUserLocationContext()!;
	const [followUser, setFollowUser] = useState(true);
	const mapViewRef = useRef<MapViewRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);

	const handleUserLocUpdate = (loc: Location) => {
		let zoom = 17;
		let coords: [number, number] = [loc.coords.longitude, loc.coords.latitude];
		dispatch({
			type: "update_location",
			payload: {
				enabled: true,
				coords,
				zoom,
			},
		});
	};

	return (
		<>
			<Filter />
			{userLoc.enabled && <FindUserPressable setFollowUser={setFollowUser} />}
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
					followUserLocation={userLoc.enabled ? followUser : false}
					followUserMode={UserTrackingMode.FollowWithCourse}
					// followZoomLevel={followUser ? 17 : undefined}
					onUserTrackingModeChange={(e) => {
						if (!e.nativeEvent.payload.followUserLocation) {
							setFollowUser(false);
						}
					}}
				/>
				<UserLocation
					visible
					showsUserHeadingIndicator
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
