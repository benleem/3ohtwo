import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SpotProvider } from "@/context/SpotsContext";
import * as SQLite from "expo-sqlite";

export default function Layout() {
	return (
		<SQLite.SQLiteProvider
			databaseName="3ohtwo.db"
			onInit={async (db: SQLite.SQLiteDatabase) => {
				// Define the target database version.
				const DATABASE_VERSION = 1;

				// PRAGMA is a special command in SQLite used to query or modify database settings. For example, PRAGMA user_version retrieves or sets a custom schema version number, helping you track migrations.
				// Retrieve the current database version using PRAGMA.
				let result = await db.getFirstAsync<{
					user_version: number;
				} | null>("PRAGMA user_version");
				let currentDbVersion = result?.user_version ?? 0;

				// If the current version is already equal or newer, no migration is needed.
				if (currentDbVersion >= DATABASE_VERSION) {
					console.log("No migration needed, DB version:", currentDbVersion);
					return;
				}

				// For a new or uninitialized database (version 0), apply the initial migration.
				if (currentDbVersion === 0) {
					// 0 false 1 true
					await db.execAsync(`
						PRAGMA journal_mode = WAL;
						CREATE TABLE IF NOT EXISTS spots (id INTEGER PRIMARY KEY NOT NULL, public INTEGER NOT NULL DEFAULT 0, name TEXT NOT NULL, image TEXT NOT NULL);
						CREATE TABLE IF NOT EXISTS coords (id INTEGER PRIMARY KEY NOT NULL, spotid INTEGER NOT NULL,lat REAL NOT NULL, lon REAL NOT NULL);
						CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, spotid INTEGER NOT NULL, category TEXT NOT NULL);
					`);
					console.log(
						"Initial migration applied, DB version:",
						DATABASE_VERSION
					);
					// Update the current version after applying the initial migration.
					currentDbVersion = 1;
				} else {
					console.log("DB version:", currentDbVersion);
				}

				// Future migrations for later versions can be added here.
				// Example:
				// if (currentDbVersion === 1) {
				//   // Add migration steps for upgrading from version 1 to a higher version.
				// }

				// Set the database version to the target version after migration.
				await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
			}}
		>
			<SpotProvider>
				<GestureHandlerRootView style={styles.gestureContainer}>
					<StatusBar style="dark" />
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</GestureHandlerRootView>
			</SpotProvider>
		</SQLite.SQLiteProvider>
	);
}
const styles = StyleSheet.create({
	gestureContainer: {
		flex: 1,
		height: 100,
	},
});
