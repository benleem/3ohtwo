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
import { Coords, useUserLocationContext } from "@/context/UserLocationContext";
import Filter from "./Filter";
import FindUserPressable from "./FindUserPressable";
import Pin from "./Pin";
import MapBottomSheet from "./MapBottomSheet";
import ConfirmUploadSpot from "./ConfirmUploadSpot";

export type PinInfo = {
	coords: Coords;
	show: boolean;
};

export default function Map() {
	const { userLoc, dispatch } = useUserLocationContext()!;
	const [followUser, setFollowUser] = useState(true);
	const [pin, setPin] = useState<PinInfo>({
		coords: [0, 0],
		show: false,
	});
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

	// GeoJSON.Feature type is not up to date for some reason
	// using any for now :(
	const handleMapPress = (e: any) => {
		if (pin.show === false) {
			setPin({ coords: e.geometry.coordinates, show: true });
			return;
		}
		setPin({ ...pin, show: false });
		return;
	};

	return (
		<>
			<Filter />
			<MapView
				ref={mapViewRef}
				style={styles.map}
				mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
				attributionPosition={{ top: 0, left: 12 }}
				compassEnabled={true}
				compassViewMargins={{ x: 12, y: 12 }}
				compassViewPosition={2}
				localizeLabels={true}
				onPress={(e) => handleMapPress(e)}
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
				<Pin pin={pin} />
				<UserLocation
					visible
					showsUserHeadingIndicator
					onUpdate={(loc: Location) => handleUserLocUpdate(loc)}
					onPress={() => setFollowUser(true)}
				/>
			</MapView>
			{userLoc.enabled && userLoc.coords !== null && (
				<FindUserPressable setFollowUser={setFollowUser} />
			)}
			<MapBottomSheet>
				<ConfirmUploadSpot pin={pin} />
			</MapBottomSheet>
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
