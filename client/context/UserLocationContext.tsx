import { createContext, useContext, useEffect, useReducer } from "react";
import * as Location from "expo-location";

export type Coords = [number, number];

type UserLocation = {
	enabled: boolean;
	coords: Coords | null;
};

const DEFAULT_USER_LOCATION = {
	enabled: false,
	follow: false,
	coords: null,
};

type UserLocationAction = {
	type: "update_location";
	payload: UserLocation;
};

type UserLocationContextProps = {
	userLoc: UserLocation;
	locDispatch: React.Dispatch<UserLocationAction>;
};

const UserLocationContext = createContext<UserLocationContextProps | null>(
	null
);

export const useUserLocationContext = () => useContext(UserLocationContext);

const userLocationReducer = (
	state: UserLocation,
	action: UserLocationAction
): UserLocation => {
	switch (action.type) {
		case "update_location":
			return action.payload;
		default:
			return state;
	}
};

export const UserLocationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userLoc, locDispatch] = useReducer(
		userLocationReducer,
		DEFAULT_USER_LOCATION
	);

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				locDispatch({
					type: "update_location",
					payload: DEFAULT_USER_LOCATION,
				});
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			locDispatch({
				type: "update_location",
				payload: {
					enabled: true,
					coords: [location.coords.longitude, location.coords.latitude],
				},
			});
		}
		getCurrentLocation();
	}, []);

	// useEffect(() => {
	// 	console.log(userLoc);
	// }, [userLoc]);

	return (
		<UserLocationContext.Provider value={{ userLoc, locDispatch }}>
			{children}
		</UserLocationContext.Provider>
	);
};
