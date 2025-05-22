import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import * as Location from "expo-location";

export type UserLocation = {
	isEnabled: boolean;
	coords: [number, number];
	zoom: number;
};

// interface Location {
// 	location: [number, number];
// }

type UserLocationContextProps = {
	userLoc: UserLocation;
	updateUserLoc: (newLoc: UserLocation) => void;
};

const UserLocationContext = createContext<UserLocationContextProps | null>(
	null
);

export const useUserLocationContext = () => useContext(UserLocationContext);

// export const userLocationReducer = (): MapLocation => {
// 	switch (action.type) {
// 		case "ADD_TODO":
// 			return [...state, action.payload];
// 		case "UPDATE_TODO":
// 			return state.map((todo) =>
// 				todo.id === action.payload ? { ...todo, status: true } : todo
// 			);
// 		default:
// 			return state;
// 	}
// };

export const UserLocationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// const [location, setLocation] = useState<Location.LocationObject | null>
	const [userLoc, setUserLoc] = useState<UserLocation>({
		isEnabled: false,
		coords: [-100, 40],
		zoom: 3,
	});

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setUserLoc({ ...userLoc, isEnabled: false });
				return;
			}
			setUserLoc({ ...userLoc, isEnabled: true });
		}
		getCurrentLocation();
	}, []);

	const updateUserLoc = (newLoc: UserLocation) => {
		setUserLoc(newLoc);
	};

	return (
		<UserLocationContext.Provider value={{ userLoc, updateUserLoc }}>
			{children}
		</UserLocationContext.Provider>
	);
};
