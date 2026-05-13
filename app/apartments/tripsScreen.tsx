import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TripsScreen() {
  const navigation = useNavigation<any>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Trips</Text>

      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>You don’t have any trips yet</Text>

        <Text style={styles.subText}>
          Start by creating your first apartment offer
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddApartment")}
      >
        <Text style={styles.buttonText}>Add Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 32,
    textAlign: "center",
  },

  emptyBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    marginBottom: 32,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: "center",
  },

  subText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },

  button: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.light.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
