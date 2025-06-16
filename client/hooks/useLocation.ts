import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function requestLocation() {
	const [permission, requestPermission] = Location.useForegroundPermissions();
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [locationError, setLocationError] = useState<string>("");

	async function getCurrentLocation(): Promise<Location.LocationObject | null> {
		const position = await Location.getLastKnownPositionAsync({});
		if (position !== null) {
			return position;
		} else {
			const position = await Location.getCurrentPositionAsync({});
			if (position) {
				return position;
			}
			return null;
		}
	}

	async function requestPosition() {
		if (!permission?.granted) {
			const { status } = await requestPermission();
			if (status !== "granted") {
				// let error = "Location not granted"
				setLocationError("Location not granted");
				return;
			}
			const location = await getCurrentLocation();
			if (location !== null) {
				setLocation(location);
				return;
			}
		}
		const location = await getCurrentLocation();
		if (location !== null) {
			setLocation(location);
		}
	}

	useEffect(() => {
		requestPosition();
	}, [permission]);

	// useEffect(() => {
	// 	console.log(location)
	// }, [location]);

	return { location, locationError };
}

// export function watchLocation() {
// 	const [locationSub, setLocationSub] =
// 		useState<Location.LocationObject | null>(null);

// 	function callback(location: Location.LocationObject) {
// 		console.log(location);
// 		setLocationSub(location);
// 	}

// 	function errorHandler(error: string) {
// 		console.log(error);
// 	}

// 	useEffect(() => {
// 		(async () => {
// 			const subscription = await Location.watchPositionAsync(
// 				{
// 					accuracy: Location.Accuracy.Highest,
// 					timeInterval: 1000,
// 					distanceInterval: 1,
// 				},
// 				callback,
// 				errorHandler
// 			);
// 			return () => subscription.remove();
// 		})();
// 	}, []);

// 	return { locationSub };
// }
