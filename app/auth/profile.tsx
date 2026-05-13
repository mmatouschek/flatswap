import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FlatSwap</Text>

      <Text style={styles.subtitle}>Login or create an account</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.secondaryButtonText}>Register</Text>
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
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 32,
  },

  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#f2f2f2",
  },

  secondaryButtonText: {
    color: Colors.light.text,
    fontWeight: "bold",
    fontSize: 16,
  },
});
