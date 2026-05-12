import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function SelectLocationScreen() {
  const router = useRouter();

  const [marker, setMarker] = useState({
    latitude: 48.2082,
    longitude: 16.3738,
  });

  const [locationName, setLocationName] = useState("Selected location");

  const getLocationName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,

        {
          headers: {
            "User-Agent": "FlatSwapApp",
          },
        },
      );

      const data = await response.json();

      console.log(data);

      if (!data.address) {
        setLocationName("Unknown location");
        return;
      }

      const city = data.address.city || data.address.town || "";

      const district =
        data.address.borough ||
        data.address.suburb ||
        data.address.neighbourhood ||
        data.address.city_district ||
        "";

      const finalLocation = `${city}${district ? ", " + district : ""}`;

      console.log(finalLocation);

      setLocationName(finalLocation || "Unknown location");
    } catch (error) {
      console.log(error);

      setLocationName("Location error");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        initialRegion={{
          latitude: 48.2082,
          longitude: 16.3738,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(event) => {
          const coords = event.nativeEvent.coordinate;

          setMarker(coords);

          getLocationName(coords.latitude, coords.longitude);
        }}
      >
        <Marker coordinate={marker} />
      </MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(locationName);
          router.replace({
            pathname: "/apartments/add_apartment1",

            params: {
              selectedLocation: locationName,
            },
          });
        }}
      >
        <Text style={styles.buttonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  button: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
