import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Camera,
	MapView,
	UserLocation,
	Location,
	CameraRef,
	UserTrackingMode,
	MapViewRef,
} from "@maplibre/maplibre-react-native";
import { Coords, useUserLocationContext } from "@/context/UserLocationContext";
import Filter from "./Filter";
import FindUserPressable from "./FindUserPressable";
import MapBottomSheet from "./MapBottomSheet";

export default function Map() {
	const { userLoc, dispatch } = useUserLocationContext()!;
	const [followUser, setFollowUser] = useState(true);
	const mapViewRef = useRef<MapViewRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);

	const handleUserLocUpdate = (loc: Location) => {
		let zoom = 17;
		let coords: Coords = [loc.coords.longitude, loc.coords.latitude];
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
			{userLoc.enabled && userLoc.coords !== null && (
				<FindUserPressable setFollowUser={setFollowUser} />
			)}
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
					defaultSettings={
						!userLoc.enabled && userLoc.coords === null
							? {
									centerCoordinate: [-100, 40],
									zoomLevel: userLoc.zoom,
							  }
							: {}
					}
					followUserLocation={
						userLoc.enabled && userLoc.coords !== null ? followUser : false
					}
					followUserMode={UserTrackingMode.FollowWithCourse}
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
			<MapBottomSheet />
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		zIndex: -1,
		width: "100%",
		height: "100%",
	},
});
