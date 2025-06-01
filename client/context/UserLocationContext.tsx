import { createContext, useContext, useEffect, useReducer } from "react";
import * as Location from "expo-location";

export type Coords = [number, number];

type UserLocation = {
	enabled: boolean;
	coords: Coords | null;
	zoom: number;
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
	const [userLoc, locDispatch] = useReducer(userLocationReducer, {
		enabled: false,
		coords: null,
		zoom: 3,
	});

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				locDispatch({
					type: "update_location",
					payload: { ...userLoc, enabled: false },
				});
				return;
			}
			locDispatch({
				type: "update_location",
				payload: { ...userLoc, enabled: true },
			});
		}
		getCurrentLocation();
	}, []);

	return (
		<UserLocationContext.Provider value={{ userLoc, locDispatch }}>
			{children}
		</UserLocationContext.Provider>
	);
};
