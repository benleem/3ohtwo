import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import * as SQLite from "expo-sqlite";

export enum Category {
	Read = "read",
	Chill = "chill",
	Scenic = "scenic",
	Food = "food",
	Drinks = "drinks",
	Coffee = "coffee",
	Hiking = "hiking",
}

type DBCategory = {
	id: number;
	spotId: number;
	categry: Category;
};

export type Coords = [number, number];

type DBCoords = {
	id: number;
	spotId: number;
	lat: number;
	lon: number;
};

type Spot = {
	public: boolean;
	coords: Coords;
	name: string;
	categories: Category[];
	image: string;
};

type DBSpot = {
	id: number;
	public: number;
	name: string;
	image: string;
};

const DEFAULT_SPOT: Spot = {
	public: false,
	coords: [0, 0],
	name: "",
	categories: [],
	image: "",
};

export type PinInfo = {
	coords: Coords;
	show: boolean;
};

export const DEFAULT_PIN: PinInfo = {
	coords: [0, 0],
	show: false,
};

type SpotContextProps = {
	spots: Spot[];
	currentSpot: Spot;
	pin: PinInfo;
	updateSpotForm: (spot: Spot) => void;
	clearSpotForm: () => void;
	getSpotById: (id: number) => Promise<void>;
	getSpots: () => Promise<void>;
	createSpot: (spot: Spot) => Promise<void>;
	updateSpot: (spot: Spot, id: number) => Promise<void>;
	deleteSpot: (id: number) => Promise<void>;
	setPin: React.Dispatch<React.SetStateAction<PinInfo>>;
};

const SpotContext = createContext<SpotContextProps | null>(null);

export const useSpotContext = () => useContext(SpotContext);

export const SpotProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const db = SQLite.useSQLiteContext();
	const [spots, setSpots] = useState<Spot[]>([]);
	const [currentSpot, setCurrentSpot] = useState<Spot>(DEFAULT_SPOT);
	const [pin, setPin] = useState<PinInfo>({
		coords: [0, 0],
		show: false,
	});

	useEffect(() => {
		console.log(currentSpot);
	}, [currentSpot]);

	useEffect(() => {
		console.log(spots);
	}, [spots]);

	useEffect(() => {
		getSpots();
	}, [db]);

	useEffect(() => {
		if (pin.show) {
			updateSpotForm({ ...currentSpot, coords: pin.coords });
			return;
		}
	}, [pin]);

	// form state changes
	const updateSpotForm = (spot: Spot) => {
		setCurrentSpot(spot);
	};

	const clearSpotForm = () => {
		setPin(DEFAULT_PIN);
		setCurrentSpot(DEFAULT_SPOT);
	};

	// db changes
	const getSpots = useCallback(async () => {
		// await SQLite.deleteDatabaseAsync("3ohtwo.db");
		try {
			const spots = await db.getAllAsync<Spot>("SELECT * FROM spots");
			setSpots(spots);
		} catch (err) {
			console.log(err);
		}
	}, [db]);

	// const getSpotsByRegion = async () => {
	// 	try {
	// 		const spots = await db.getAllAsync<Spot>("SELECT * FROM spots");
	// 		console.log(spots);
	// 		setSpots(spots);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const getSpotById = async (id: number) => {
		try {
			const spot = await db.getFirstAsync<Spot>(
				"SELECT * FROM spots WHERE id = $id",
				{
					$id: id,
				}
			);
			// console.log(spot);
			// setSpots(spots);
		} catch (err) {
			console.log(err);
		}
	};

	const createSpot = async (spot: Spot) => {
		try {
			const newSpot = await db.runAsync(
				"INSERT INTO spots (public, name, image) VALUES ($public, $name, $image)",
				{
					$public: spot.public === true ? 1 : 0,
					$name: spot.name,
					$image: spot.image,
				}
			);
			// console.log(newSpot.lastInsertRowId);
			// setSpots(spots);
		} catch (err) {
			console.log(err);
		}
	};

	const updateSpot = async (spot: Spot, id: number) => {
		try {
			const updatedSpot = await db.runAsync(
				"UPDATE spots SET public = $public, name = $name, image = $image WHERE id = $id",
				{
					$id: id,
					$public: spot.public === true ? 1 : 0,
					$name: spot.name,
					$image: spot.image,
				}
			);
			// console.log(updatedSpot);
			// setSpots(spots);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteSpot = async (id: number) => {
		try {
			const deletedSpot = await db.runAsync(
				"DELETE FROM spots WHERE id = $id",
				{
					$id: id,
				}
			);
			// console.log(deletedSpot);
			// setSpots(spots);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SpotContext.Provider
			value={{
				spots,
				currentSpot,
				pin,
				updateSpotForm,
				clearSpotForm,
				getSpotById,
				getSpots,
				createSpot,
				updateSpot,
				deleteSpot,
				setPin,
			}}
		>
			{children}
		</SpotContext.Provider>
	);
};
