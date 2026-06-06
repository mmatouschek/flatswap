import { useNavigation } from "@react-navigation/native";
import { Fragment } from "react";
import { Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import getAllUsers from "../../backend/FlatSwapAPI";
type MapProps = {
  latitude?: number;
  longitude?: number;
  searchResult: any[];
};

export default function FlatSwapMap({
  latitude,
  longitude,
  searchResult,
}: MapProps) {
  let results = searchResult;
  if (results.length <= 0) {
    results = getAllUsers();nd
  }
  const delta = 0.05;
  const navigation = useNavigation();

  const safeLatitude = latitude || 48.2082;
  const safeLongitude = longitude || 16.3738;
  return (
    <View
      style={{ flex: 4, marginTop: 10, borderRadius: 10, overflow: "hidden" }}
    >
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: safeLatitude,
          longitude: safeLongitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
      >
        {results.map((item) => {
          const green = Math.round(((item.trustscore - 100) / 900) * 255);
          const red = 255 - green;
          const color = `rgb(${red}, ${green}, 0)`;

          return (
            <Fragment key={item.id}>
              <Circle
                key={`circle-${item.id}`}
                center={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                radius={400}
                fillColor="rgba(37, 99, 235, 0.2)"
                strokeColor="rgba(37, 99, 235, 0.6)"
                strokeWidth={1}
              />

              <Marker
                key={`marker-${item.id}`}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                onPress={() => {
                  console.log("id " + item.id);
                  navigation.navigate("DetailView", { id: item.id });
                }}
              >
                <View
                  style={{
                    backgroundColor: color,
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>{item.trustscore}</Text>
                </View>
              </Marker>
            </Fragment>
          );
        })}
      </MapView>
    </View>
  );
}

function formatDate(date: string) {
  return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
}
