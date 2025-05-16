import { createContext, useContext, ReactNode, useState } from "react";

type Location = [number, number];

// interface Location {
// 	location: [number, number];
// }

type LocationContextProps = {
	location: Location;
	updateLocation: (newLoc: Location) => void;
};

const LocationContext = createContext<LocationContextProps | null>(null);

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [location, setLocation] = useState<Location>([0, 0]);

	const updateLocation = (newLoc: Location) => {
		setLocation(newLoc);
	};

	return (
		<LocationContext.Provider value={{ location, updateLocation }}>
			{children}
		</LocationContext.Provider>
	);
};
