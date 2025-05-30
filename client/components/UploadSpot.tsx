import {
	StyleSheet,
	Pressable,
	TextInput,
	Text,
	FlatList,
	View,
	Switch,
	ScrollView,
} from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Dispatch, SetStateAction, useState } from "react";
import { useLocalSearchParams, Link } from "expo-router";
import { Coords } from "@/context/UserLocationContext";
import SpotImagePicker from "./SpotImagePicker";

enum Category {
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
	categories: Category[];
	coords: Coords | undefined;
	public: boolean;
	image: string;
};

type CategoryButtonsProps = {
	setInputs: Dispatch<SetStateAction<SpotInputs>>;
};

function CategoryButtons({ setInputs }: CategoryButtonsProps) {
	const iterateCategories = () => {
		let categories: Category[] = [];
		const keys = Object.keys(Category);
		keys.forEach((key) => {
			categories.push(Category[key as keyof typeof Category]);
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

function FormButtons() {
	const { bottom } = useSafeAreaInsets();
	const { location } = useLocalSearchParams();

	const handleSubmit = () => {
		console.log(location);
	};

	return (
		<View style={[styles.formButtonContainer, { paddingBottom: bottom }]}>
			<Link
				style={[styles.formButton, { color: "red", borderColor: "red" }]}
				href={{
					pathname: "/",
				}}
				suppressHighlighting
			>
				Cancel
			</Link>
			<Pressable
				style={[styles.formButton, { borderColor: "blue" }]}
				onPress={handleSubmit}
			>
				<Text style={{ alignSelf: "center", color: "blue" }}>Submit</Text>
			</Pressable>
		</View>
	);
}

export default function UploadSpot() {
	const [inputs, setInputs] = useState<SpotInputs>({
		public: false,
		coords: undefined,
		name: "",
		categories: [],
		image: "",
	});
	// const [switchEnabled, setSwitchEnabled] = useState(false);
	// const toggleSwitch = () =>
	// 	setSwitchEnabled((previousState) => !previousState);

	return (
		<>
			<SafeAreaView style={styles.uploadContainer}>
				<ScrollView>
					<Text style={[styles.title]}>Add Spot</Text>
					<TextInput
						style={styles.textInput}
						placeholderTextColor={"gray"}
						placeholder="Spot name"
						onChangeText={(text) => setInputs({ ...inputs, name: text })}
						value={inputs.name}
					/>
					<CategoryButtons setInputs={setInputs} />
					{/* <View style={styles.switchContainer}>
					<Text>Public?</Text>
					<Switch
						trackColor={{ false: "#767577", true: "blue" }}
						thumbColor={switchEnabled ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={switchEnabled}
					/>
				</View> */}
					<SpotImagePicker />
				</ScrollView>
			</SafeAreaView>
			<FormButtons />
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 700,
		paddingHorizontal: 12,
		paddingBottom: 12,
	},
	uploadContainer: {
		height: "100%",
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
		marginBottom: 12,
		gap: 12,
		maxHeight: 430,
		// backgroundColor: "red",
	},
	categoryButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 100,
		borderColor: "black",
		borderWidth: 1,
	},
	switchContainer: {
		paddingHorizontal: 12,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	formButtonContainer: {
		paddingTop: 12,
		paddingHorizontal: 12,
		position: "absolute",
		bottom: 0,
		display: "flex",
		flexDirection: "row",
		gap: 12,
		width: "100%",
		backgroundColor: "white",
		borderColor: "gray",
		borderTopWidth: 1,
	},
	formButton: {
		padding: 12,
		flex: 1,
		borderRadius: 100,
		textAlign: "center",
		borderWidth: 1,
	},
	submitButton: {
		borderColor: "blue",
	},
});
