import { createContext, useContext, useEffect, useReducer } from "react";
import { Coords } from "./UserLocationContext";

export enum Category {
	Read = "read",
	Chill = "chill",
	Scenic = "scenic",
	Food = "food",
	Drinks = "drinks",
	Coffee = "coffee",
	Hiking = "hiking",
}

type Spot = {
	name: string;
	categories: Category[];
	coords: Coords | undefined;
	public: boolean;
	image: string;
};

type UploadSpotAction = {
	type: "update_spot" | "clear_spot";
	payload: Spot;
};

type UploadSpotContextProps = {
	spot: Spot;
	spotDispatch: React.Dispatch<UploadSpotAction>;
};

const UploadSpotContext = createContext<UploadSpotContextProps | null>(null);

export const useUploadSpotContext = () => useContext(UploadSpotContext);

const uploadSpotReducer = (state: Spot, action: UploadSpotAction): Spot => {
	switch (action.type) {
		case "update_spot":
			return action.payload;
		case "clear_spot":
			return {
				public: false,
				coords: undefined,
				name: "",
				categories: [],
				image: "",
			};
		default:
			return state;
	}
};

export const UploadSpotProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [spot, spotDispatch] = useReducer(uploadSpotReducer, {
		public: false,
		coords: undefined,
		name: "",
		categories: [],
		image: "",
	});

	useEffect(() => {
		console.log(spot);
	}, [spot]);

	return (
		<UploadSpotContext.Provider value={{ spot, spotDispatch }}>
			{children}
		</UploadSpotContext.Provider>
	);
};
