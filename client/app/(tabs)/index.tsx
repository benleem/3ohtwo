import { StyleSheet, View } from "react-native";
import { requestLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import Map from "@/components/Map";
import FindUserPressable from "@/components/FindUserPressable";
import MapBottomSheet from "@/components/MapBottomSheet";
import ConfirmUploadSpot from "@/components/ConfirmUploadSpot";
import { PinInfo } from "@/components/Pin";

export default function Tab() {
	const { location } = requestLocation();
	const [followUser, setFollowUser] = useState(true);
	const [pin, setPin] = useState<PinInfo>({
		coords: [0, 0],
		show: false,
	});

	useEffect(() => {
		if (location !== null) {
			setFollowUser(true);
		}
	}, [location]);

	return (
		<View style={styles.container}>
			<Filter />
			<Map
				location={location}
				followUser={followUser}
				setFollowUser={setFollowUser}
				pin={pin}
				setPin={setPin}
			/>
			{location !== null && <FindUserPressable setFollowUser={setFollowUser} />}
			<MapBottomSheet>
				<ConfirmUploadSpot pin={pin} setPin={setPin} />
			</MapBottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
