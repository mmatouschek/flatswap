import { isUserLoggedIn } from "@/backend/services/AuthStorage";
import { deleteTrip, getTrips } from "@/backend/services/UserStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TripsScreen() {
  const navigation = useNavigation<any>();

  const [trips, setTrips] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTrips();
    }, []),
  );

  const loadTrips = async () => {
    const savedTrips = await getTrips();

    setTrips(savedTrips);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Trips</Text>

      {trips.length === 0 ? (
        <>
          <Text style={styles.emptyTitle}>You don't have any trips yet 🙁</Text>

          <Text style={styles.emptySubtitle}>
            Start by creating your first apartment offer
          </Text>
        </>
      ) : (
        <>
          {trips.map((trip, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripTitle}>
                  ✈️ {trip.locations?.[0]} →{" "}
                  {trip.preferredLocations?.join(", ")}
                </Text>

                <Text style={styles.tripGuests}>👥 {trip.guests}</Text>
              </View>

              <Text style={styles.tripDates}>
                📅 {formatDate(trip.startDate)}
                {"  -  "}
                {formatDate(trip.endDate)}
              </Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={async () => {
                  await deleteTrip(index);

                  loadTrips();
                }}
              >
                <Text style={styles.deleteButtonText}>Delete Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  navigation.navigate("AddApartment", {
                    editIndex: index,
                    tripData: trip,
                  });
                }}
              >
                <Text style={styles.editButtonText}>Edit Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => {
                  navigation.navigate("ReviewHost");
                }}
              >
                <Text style={styles.reviewButtonText}>Leave Review</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const loggedIn = await isUserLoggedIn();

          if (!loggedIn) {
            Alert.alert(
              "Login required",
              "Please login before creating a trip.",
            );
            navigation.navigate("Profile");
            return;
          }
          navigation.navigate("AddApartment");
        }}
      >
        <Text style={styles.buttonText}>Add Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 80,
    backgroundColor: "#f3f8fb",
    flexGrow: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f1720",
    marginBottom: 32,
    textAlign: "center",
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#0f1720",
  },

  emptySubtitle: {
    textAlign: "center",
    color: "#54707f",
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 22,
  },

  tripCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  tripTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f1720",
    flex: 1,
    marginRight: 12,
  },

  tripGuests: {
    color: "#54707f",
    fontWeight: "600",
    fontSize: 15,
  },

  tripDates: {
    color: "#54707f",
    marginTop: 4,
    fontSize: 14,
  },

  deleteButton: {
    marginTop: 16,
    backgroundColor: "#fff5f5",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(217, 83, 79, 0.12)",
  },

  deleteButtonText: {
    color: "#d9534f",
    fontWeight: "700",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#1ca349",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  editButton: {
    marginTop: 12,
    backgroundColor: "#eef7fa",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  editButtonText: {
    color: "#0f1720",
    fontWeight: "700",
    fontSize: 15,
  },
  reviewButton: {
    marginTop: 12,
    backgroundColor: "#1ca349",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  reviewButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
