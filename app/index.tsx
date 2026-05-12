import { StyleSheet, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
export default function HomeScreen() {
  const results = [
    { key: 1, name: "Hotel Alpha", latitude: 48.2082, longitude: 16.3738 },
    { key: 2, name: "Hotel Beta", latitude: 48.21, longitude: 16.37 },
    { key: 3, name: "Hotel Gamma", latitude: 48.205, longitude: 16.38 },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.2082,
          longitude: 16.3738,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {results.map((item) => (
          <Circle
            center={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            radius={400} // meters
            fillColor="rgba(37, 99, 235, 0.2)"
            strokeColor="rgba(37, 99, 235, 0.6)"
            strokeWidth={1}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },

  deadspace: {
    height: 20,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  searchBar: {
    flex: 7,
    height: 45,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
