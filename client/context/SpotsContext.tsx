import { createContext, useContext, useEffect, useReducer } from "react";

export enum Category {
	Read = "read",
	Chill = "chill",
	Scenic = "scenic",
	Food = "food",
	Drinks = "drinks",
	Coffee = "coffee",
	Hiking = "hiking",
}

export type Coords = [number, number];

type Spot = {
	public: boolean;
	coords: Coords | undefined;
	name: string;
	categories: Category[];
	image: string;
};

const DEFAULT_SPOT: Spot = {
	public: false,
	coords: undefined,
	name: "",
	categories: [],
	image: "",
};

type SpotAction = {
	type: "update_spot" | "clear_spot";
	payload: Spot;
};

type SpotContextProps = {
	spot: Spot;
	spotDispatch: React.Dispatch<SpotAction>;
};

const SpotContext = createContext<SpotContextProps | null>(null);

export const useSpotContext = () => useContext(SpotContext);

const spotReducer = (state: Spot, action: SpotAction): Spot => {
	switch (action.type) {
		case "update_spot":
			return action.payload;
		case "clear_spot":
			return DEFAULT_SPOT;
		default:
			return state;
	}
};

export const SpotProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [spot, spotDispatch] = useReducer(spotReducer, DEFAULT_SPOT);

	useEffect(() => {
		console.log(spot);
	}, [spot]);

	return (
		<SpotContext.Provider value={{ spot, spotDispatch }}>
			{children}
		</SpotContext.Provider>
	);
};
