import { StyleSheet, View } from "react-native";
import { requestLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import Map from "@/components/Map";
import FindUserPressable from "@/components/FindUserPressable";
import MapBottomSheet from "@/components/MapBottomSheet";
import ConfirmUploadSpot from "@/components/ConfirmUploadSpot";
import { MapBottomSheetProvider } from "@/context/BottomSheetContext";
import { Location } from "@maplibre/maplibre-react-native";
import { useSpotContext } from "@/context/SpotsContext";
import SpotInfo from "@/components/SpotInfo";

export default function Tab() {
	const { currentSpot, pin, updateSpotForm } = useSpotContext()!;
	const { location } = requestLocation();
	const [followUser, setFollowUser] = useState(true);
	const [userLoc, setUserLoc] = useState<Location | null>(null);

	useEffect(() => {
		if (location !== null) {
			setFollowUser(true);
		} else {
			setFollowUser(false);
		}
	}, [location]);

	// useEffect(() => {
	// 	console.log(userLoc);
	// }, [userLoc]);

	return (
		<View style={styles.container}>
			<Filter />
			<Map
				location={location}
				setUserLoc={setUserLoc}
				followUser={followUser}
				setFollowUser={setFollowUser}
			/>
			{location !== null && <FindUserPressable setFollowUser={setFollowUser} />}
			<MapBottomSheetProvider>
				<ConfirmUploadSpot userLoc={userLoc} />
			</MapBottomSheetProvider>
			<MapBottomSheetProvider>
				<SpotInfo />
			</MapBottomSheetProvider>
			{/* <MapBottomSheet>
				<ConfirmUploadSpot pin={pin} setPin={setPin} />
			</MapBottomSheet> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
