import React from "react";
import { StyleSheet } from "react-native";
import { MapView } from "@maplibre/maplibre-react-native";

export default function Map() {
  return (
    <MapView
      style={styles.map}
      mapStyle={"https://tiles.openfreemap.org/styles/liberty"}
      localizeLabels={true}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
