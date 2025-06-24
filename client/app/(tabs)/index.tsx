import { StyleSheet, View } from "react-native";
import { requestLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import Map from "@/components/Map";
import FindUserPressable from "@/components/FindUserPressable";
import MapBottomSheet from "@/components/MapBottomSheet";
import ConfirmUploadSpot from "@/components/ConfirmUploadSpot";
import { PinInfo } from "@/components/Pin";
import { MapBottomSheetProvider } from "@/context/BottomSheetContext";
import { Location } from "@maplibre/maplibre-react-native";
import { useSpotContext } from "@/context/SpotsContext";

export default function Tab() {
	const { currentSpot, updateSpotForm } = useSpotContext()!;
	const { location } = requestLocation();
	const [followUser, setFollowUser] = useState(true);
	const [userLoc, setUserLoc] = useState<Location | null>(null);
	const [pin, setPin] = useState<PinInfo>({
		coords: [0, 0],
		show: false,
	});

	useEffect(() => {
		if (location !== null) {
			setFollowUser(true);
		} else {
			setFollowUser(false);
		}
	}, [location]);

	useEffect(() => {
		if (pin.show) {
			updateSpotForm({ ...currentSpot, coords: pin.coords });
		}
	}, [pin]);

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
				pin={pin}
				setPin={setPin}
			/>
			{location !== null && <FindUserPressable setFollowUser={setFollowUser} />}
			<MapBottomSheetProvider>
				<ConfirmUploadSpot pin={pin} setPin={setPin} userLoc={userLoc} />
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
