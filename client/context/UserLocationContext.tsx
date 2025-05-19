import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export type MapLocation = {
	coords: [number, number];
	zoom: number;
};

// interface Location {
// 	location: [number, number];
// }

type UserLocationContextProps = {
	userLoc: MapLocation;
	updateUserLoc: (newLoc: MapLocation) => void;
};

const UserLocationContext = createContext<UserLocationContextProps | null>(
	null
);

export const useUserLocationContext = () => useContext(UserLocationContext);

export const UserLocationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// const [location, setLocation] = useState<Location.LocationObject | null>(
	// 	null
	// );
	// const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [userLoc, setUserLoc] = useState<MapLocation>({
		coords: [-100, 40],
		zoom: 3,
	});

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			// let location = await Location.getCurrentPositionAsync({});
			// setLocation(location);
		}

		getCurrentLocation();
	}, []);

	const updateUserLoc = (newLoc: MapLocation) => {
		setUserLoc(newLoc);
	};

	return (
		<UserLocationContext.Provider value={{ userLoc, updateUserLoc }}>
			{children}
		</UserLocationContext.Provider>
	);
};
