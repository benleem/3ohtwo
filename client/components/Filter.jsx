import { StyleSheet, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Filter() {
	return (
        <SafeAreaView style={styles.filterContainer}>
            <Button title="Public"/>
            <Button title="Private"/>
        </SafeAreaView>
	);
}

const styles = StyleSheet.create({
	filterContainer: {
        zIndex: 1,
        display:"flex",
        flexDirection:"row",
        position: "absolute",
        top: 0,
        right:0,
        // right:125,
	},
});