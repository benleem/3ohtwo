import { useSpotContext, DBCategory } from "@/context/SpotsContext";
import { useBottomSheet, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Location } from "@maplibre/maplibre-react-native";
import { haversine } from "@/helpers/utils";
import ImageView from "./ImageView";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type SpotInfoProps = {
	showSpotInfo: boolean;
	userLoc: Location | null;
};

export default function SpotInfo({ showSpotInfo, userLoc }: SpotInfoProps) {
	const { currentSpot, pin, clearSpotForm, deleteSpot } = useSpotContext()!;
	const { close, expand } = useBottomSheet();
	const markerDistance = useMemo(() => {
		if (userLoc !== null && showSpotInfo) {
			let distance = haversine(
				[userLoc.coords.longitude, userLoc.coords.latitude],
				currentSpot.coords,
				true
			);
			return distance;
		}
	}, [showSpotInfo, userLoc, currentSpot]);

	useEffect(() => {
		if (showSpotInfo) {
			expand();
			return;
		}
		close();
	}, [showSpotInfo]);

	return (
		<View style={styles.spotInfoContainer}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>
					{currentSpot.name !== "" ? currentSpot.name : "Unnamed"}
				</Text>
				<View style={styles.buttonsContainer}>
					<Pressable style={styles.button} onPress={() => {}}>
						<Feather name="edit-2" size={18} color="black" />
					</Pressable>
					<Pressable style={styles.button} onPress={() => {}}>
						<Feather name="trash-2" size={18} color="black" />
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => {
							clearSpotForm();
						}}
					>
						<Feather name="x" size={18} color="black" />
					</Pressable>
				</View>
			</View>
			<Text style={styles.distanceText}>{markerDistance}</Text>
			{currentSpot.categories.length > 0 ? (
				<FlatList
					contentContainerStyle={styles.flatListContainer}
					data={currentSpot.categories}
					renderItem={({ item }) => (
						<Text style={styles.categoryText}>{item.category}</Text>
					)}
					// need to generate actually uuid at some point
					keyExtractor={(category: DBCategory, i: number) =>
						`${category.category}-${category.id}`
					}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			) : (
				<FlatList
					contentContainerStyle={styles.flatListContainer}
					data={["none"]}
					renderItem={({ item }) => (
						<Text style={styles.categoryText}>{item}</Text>
					)}
					// need to generate actually uuid at some point
					keyExtractor={(item, i: number) => `${item}-0`}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			)}
			<View style={{ paddingHorizontal: 12 }}>
				<ImageView />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	spotInfoContainer: {
		// backgroundColor: "green",
		marginBottom: 12,
	},
	headerContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
	},
	title: {
		fontSize: 24,
		fontWeight: 500,
	},
	buttonsContainer: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		gap: 12,
	},
	button: {
		padding: 4,
		backgroundColor: Colors.lightGray,
		borderRadius: 18,
	},
	distanceText: {
		color: "gray",
		display: "flex",
		fontSize: 12,
		paddingHorizontal: 12,
	},
	flatListContainer: {
		paddingHorizontal: 12,
		marginBottom: 12,
		marginTop: 8,
		gap: 8,
		// maxHeight: 430,
		// backgroundColor: "red",
	},
	categoryText: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 100,
		borderColor: Colors.babyBlue,
		borderWidth: 1,
		color: Colors.babyBlue,
	},
});
