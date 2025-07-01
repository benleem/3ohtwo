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

export type DBCategory = {
	id: number;
	category: Category;
};

export type Coords = [number, number];

export type Spot = {
	id: number;
	public: boolean;
	coords: Coords;
	name: string;
	categories: DBCategory[];
	image: string;
};

type DBSpot = {
	id: number;
	public: number;
	lat: number;
	lon: number;
	name: string;
	categories: string;
	image: string;
};

const DEFAULT_SPOT: Spot = {
	id: 0,
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

export const DB_MIGRATION = () => {
	let categories: Category[] = [];
	const keys = Object.keys(Category);
	keys.forEach((key) => {
		categories.push(Category[key as keyof typeof Category]);
	});

	let migration = `
	PRAGMA journal_mode = WAL;
	CREATE TABLE IF NOT EXISTS spots (id INTEGER PRIMARY KEY NOT NULL, public INTEGER NOT NULL DEFAULT 0, lat REAL NOT NULL, lon REAL NOT NULL, name TEXT NOT NULL, image TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, category TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS spot_categories (spot_id INTEGER, category_id INTEGER, FOREIGN KEY(spot_id) REFERENCES spots(id), FOREIGN KEY(category_id) REFERENCES categories(id), UNIQUE(spot_id, category_id));
	CREATE INDEX IF NOT EXISTS idx_spot_categories_spot_id ON spot_categories (spot_id);
	CREATE INDEX IF NOT EXISTS idx_spot_categories_category_id ON spot_categories (category_id);
	INSERT INTO categories (category) VALUES ${categories
		.map((category) => {
			return `('${category}')`;
		})
		.join(", ")};
	`;
	return migration;
};

type SpotContextProps = {
	categories: DBCategory[];
	spots: Spot[];
	currentSpot: Spot;
	pin: PinInfo;
	updateSpotForm: (spot: Spot) => void;
	clearSpotForm: () => void;
	// getSpotById: (id: number) => Promise<void>;
	getSpots: () => Promise<void>;
	createSpot: (spot: Spot) => Promise<void>;
	updateSpot: (spot: Spot) => Promise<void>;
	deleteSpot: (id: number) => Promise<void>;
	setPin: React.Dispatch<React.SetStateAction<PinInfo>>;
};

const SpotContext = createContext<SpotContextProps | null>(null);

export const useSpotContext = () => useContext(SpotContext);

export const SpotProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const db = SQLite.useSQLiteContext();
	const [categories, setCategories] = useState<DBCategory[]>([]);
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

	// useEffect(() => {
	// 	console.log(categories);
	// }, [categories]);

	useEffect(() => {
		getCategories();
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
	const getCategories = useCallback(async () => {
		try {
			let categories = await db.getAllAsync<DBCategory>(
				"SELECT * FROM categories"
			);
			setCategories(categories);
		} catch (error) {
			console.log(error);
		}
	}, [db]);

	const getSpots = useCallback(async () => {
		// await SQLite.deleteDatabaseAsync("3ohtwo.db");
		try {
			let newSpots: Spot[] = [];
			let dbSpots = await db.getAllAsync<DBSpot>(
				// "SELECT s.id, s.public, s.lat, s.lon, s.name, s.image, GROUP_CONCAT(c.category, ', ') AS categories FROM spots AS s LEFT JOIN spot_categories AS sc ON s.id = sc.spot_id LEFT JOIN categories AS c ON sc.category_id = c.id GROUP BY s.id ORDER BY s.id"
				"SELECT s.id, s.public, s.lat, s.lon, s.name, s.image, json_group_array(json_object('id', c.id, 'category', c.category)) AS categories FROM spots AS s LEFT JOIN spot_categories AS sc ON s.id = sc.spot_id LEFT JOIN categories AS c ON sc.category_id = c.id GROUP BY s.id ORDER BY s.id"
			);
			dbSpots.forEach((dbSpot, i) => {
				let categories: DBCategory[] = JSON.parse(dbSpot.categories);
				newSpots.push({
					id: dbSpot.id,
					public: dbSpot.public === 1 ? true : false,
					coords: [dbSpot.lon, dbSpot.lat],
					name: dbSpot.name,
					categories:
						categories[0].category !== null && categories[0].id !== null
							? (categories as DBCategory[])
							: ([] as DBCategory[]),
					image: dbSpot.image,
				});
			});
			setSpots(newSpots);
		} catch (error) {
			console.log(error);
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

	// const getSpotById = async (id: number) => {
	// 	try {
	// 		const spot = await db.getFirstAsync<Spot>(
	// 			"SELECT * FROM spots WHERE id = $id",
	// 			{
	// 				$id: id,
	// 			}
	// 		);
	// 		// console.log(spot);
	// 		// setSpots(spots);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const createSpot = async (spot: Spot) => {
		try {
			await db.withExclusiveTransactionAsync(async (txn) => {
				let result = await txn.runAsync(
					"INSERT INTO spots (public, lat, lon, name, image) VALUES ($public, $lat, $lon, $name, $image)",
					{
						$public: spot.public === true ? 1 : 0,
						$lat: spot.coords[1],
						$lon: spot.coords[0],
						$name: spot.name,
						$image: spot.image,
					}
				);

				if (spot.categories.length > 0) {
					let categoriesQuery = `INSERT OR IGNORE INTO spot_categories (spot_id, category_id) VALUES ${spot.categories
						.map((category) => {
							return `(${result.lastInsertRowId}, ${category.id})`;
						})
						.join(", ")};`;
					await txn.execAsync(categoriesQuery);
				}
			});
			await getSpots();
		} catch (error) {
			console.log(error);
		}
	};

	const updateSpot = async (spot: Spot) => {
		try {
			await db.withExclusiveTransactionAsync(async (txn) => {
				await txn.runAsync(
					"UPDATE spots SET public = $public, lat = $lat, lon = $lon, name = $name, image = $image WHERE id = $id",
					{
						$id: spot.id,
						$public: spot.public === true ? 1 : 0,
						$lat: spot.coords[1],
						$lon: spot.coords[0],
						$name: spot.name,
						$image: spot.image,
					}
				);

				if (spot.categories.length > 0) {
					let categoriesDeleteQuery = `DELETE FROM spot_categories WHERE spot_id = ${
						spot.id
					} AND category_id NOT IN (${spot.categories
						.map((category) => {
							return category.id;
						})
						.join(", ")});`;
					// console.log(categoriesDeleteQuery);
					await txn.execAsync(categoriesDeleteQuery);

					let categoriesInsertQuery = `INSERT OR IGNORE INTO spot_categories (spot_id, category_id) VALUES ${spot.categories
						.map((category) => {
							return `(${spot.id}, ${category.id})`;
						})
						.join(", ")};`;
					// console.log(categoriesInsertQuery);
					await txn.execAsync(categoriesInsertQuery);
				} else {
					await txn.runAsync(
						"DELETE FROM spot_categories WHERE spot_id = $id",
						{
							$id: spot.id,
						}
					);
				}
			});
			await getSpots();
		} catch (err) {
			console.log(err);
		}
	};

	const deleteSpot = async (id: number) => {
		try {
			await db.withExclusiveTransactionAsync(async (txn) => {
				await txn.runAsync("DELETE FROM spots WHERE id = $id", {
					$id: id,
				});
				await txn.runAsync("DELETE FROM spot_categories WHERE spot_id = $id", {
					$id: id,
				});
			});
			await getSpots();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SpotContext.Provider
			value={{
				categories,
				spots,
				currentSpot,
				pin,
				updateSpotForm,
				clearSpotForm,
				// getSpotById,
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
//
