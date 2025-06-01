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
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Category, useUploadSpotContext } from "@/context/UploadSpotContext";
import SpotImagePicker from "./SpotImagePicker";

type CategoryButtonProps = {
	item: Category;
};

function CategoryButton({ item }: CategoryButtonProps) {
	const { spot, spotDispatch } = useUploadSpotContext()!;
	const [selected, setSelected] = useState<boolean>(false);

	const handleToggle = (item: Category) => {
		if (spot.categories.includes(item)) {
			spotDispatch({
				type: "update_spot",
				payload: {
					...spot,
					categories: spot.categories.filter((category) => {
						return category !== item;
					}),
				},
			});
			return;
		}
		spotDispatch({
			type: "update_spot",
			payload: {
				...spot,
				categories: [...spot.categories, item],
			},
		});
	};

	useEffect(() => {
		if (spot.categories.includes(item)) {
			setSelected(true);
			return;
		}
		setSelected(false);
	}, [spot]);

	return (
		<Pressable
			style={[
				styles.categoryButton,
				selected ? { borderColor: "blue" } : { borderColor: "black" },
			]}
			onPress={() => handleToggle(item)}
		>
			<Text style={[selected ? { color: "blue" } : { color: "black " }]}>
				{item}
			</Text>
		</Pressable>
	);
}

function CategoryButtons() {
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
			renderItem={({ item }) => <CategoryButton item={item} />}
			// need to generate actually uuid at some point
			keyExtractor={(item, index) => `${item}-${index}`}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	);
}

function FormButtons() {
	const { bottom } = useSafeAreaInsets();

	const handleSubmit = () => {
		console.log("Submitted");
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
	const { spot, spotDispatch } = useUploadSpotContext()!;

	// const [switchEnabled, setSwitchEnabled] = useState(false);
	// const toggleSwitch = () =>
	// 	setSwitchEnabled((previousState) => !previousState);

	const updateName = (text: string) => {
		spotDispatch({
			type: "update_spot",
			payload: {
				...spot,
				name: text,
			},
		});
	};

	return (
		<>
			<SafeAreaView style={styles.uploadContainer}>
				<ScrollView>
					<Text style={[styles.title]}>Add Spot</Text>
					<TextInput
						style={styles.textInput}
						placeholderTextColor={"gray"}
						placeholder="Spot name"
						onChangeText={(text) => updateName(text)}
						value={spot.name}
					/>
					<CategoryButtons />
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
