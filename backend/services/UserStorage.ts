import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveTrip(trip: any) {
  const existing = await AsyncStorage.getItem("myTrips");

  const parsed = existing ? JSON.parse(existing) : [];

  parsed.push(trip);

  await AsyncStorage.setItem("myTrips", JSON.stringify(parsed));
}

export async function getTrips() {
  const trips = await AsyncStorage.getItem("myTrips");

  return trips ? JSON.parse(trips) : [];
}

export async function deleteTrip(index: number) {
  const existing = await AsyncStorage.getItem("myTrips");
  const parsed = existing ? JSON.parse(existing) : [];
  parsed.splice(index, 1);
  await AsyncStorage.setItem("myTrips", JSON.stringify(parsed));
}
