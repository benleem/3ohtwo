import {
	StyleSheet,
	Pressable,
	TextInput,
	Text,
	FlatList,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Coords } from "@/context/UserLocationContext";
import { Dispatch, SetStateAction, useState } from "react";

enum Categories {
	Read = "read",
	Chill = "chill",
	Scenic = "scenic",
	Food = "food",
	Drinks = "drinks",
	Coffee = "coffee",
	Hiking = "hiking",
}

type SpotInputs = {
	name: string;
	categories: Categories[];
	coords: Coords | undefined;
	public: boolean;
};

type CategoryButtonsProps = {
	setInputs: Dispatch<SetStateAction<SpotInputs>>;
};

function CategoryButtons({ setInputs }: CategoryButtonsProps) {
	const iterateCategories = () => {
		let categories: Categories[] = [];
		const keys = Object.keys(Categories);
		keys.forEach((key) => {
			categories.push(Categories[key as keyof typeof Categories]);
		});
		return categories;
	};

	return (
		<FlatList
			contentContainerStyle={styles.flatListContainer}
			data={iterateCategories()}
			renderItem={({ item }) => (
				<Pressable style={styles.categoryButton}>
					<Text>{item}</Text>
				</Pressable>
			)}
			// need to generate actually uuid at some point
			keyExtractor={(item, index) => `${item}-${index}`}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	);
}

export default function UploadSpot() {
	const [inputs, setInputs] = useState<SpotInputs>({
		name: "",
		categories: [],
		coords: undefined,
		public: false,
	});

	const handleSubmit = () => {
		console.log("submitted");
	};

	return (
		<SafeAreaView style={styles.uploadContainer}>
			<TextInput
				style={styles.textInput}
				placeholder="Spot name"
				onChangeText={(text) => setInputs({ ...inputs, name: text })}
				value={inputs.name}
			/>
			<CategoryButtons setInputs={setInputs} />
			{/* <Pressable>
				<Text>Public?</Text>
				</Pressable>
				<Pressable style={styles.submit} onPress={handleSubmit}>
				<Text>Submit</Text>
				</Pressable> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	uploadContainer: {
		// backgroundColor: "green",
	},
	textInput: {
		padding: 12,
		marginHorizontal: 12,
		marginBottom: 12,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 8,
		fontSize: 16,
	},
	flatListContainer: {
		paddingHorizontal: 12,
		gap: 12,
	},
	categoryButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 100,
		borderColor: "black",
		borderWidth: 1,
	},
	submit: {
		// backgroundColor: "green",
	},
});
