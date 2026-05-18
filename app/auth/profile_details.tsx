import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

import { useCallback, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

export default function MyProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, []),
  );

  const loadUser = async () => {
    const savedUsers = await AsyncStorage.getItem("users");

    if (!savedUsers) {
      return;
    }

    const parsed = JSON.parse(savedUsers);

    if (parsed.length > 0) {
      setUser(parsed[parsed.length - 1]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.username?.[0] || "A"}</Text>
      </View>

      <Text style={styles.name}>{user?.username || "Unknown User"}</Text>

      <Text style={styles.email}>{user?.email || "No email"}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Account Information</Text>

        <Text style={styles.infoText}>Username: {user?.username || "-"}</Text>

        <Text style={styles.infoText}>Email: {user?.email || "-"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8fb",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1ca349",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 24,

    shadowColor: "#1ca349",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,

    elevation: 3,
  },

  avatarText: {
    color: "white",
    fontSize: 46,
    fontWeight: "bold",
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f1720",
    marginBottom: 8,
  },

  email: {
    fontSize: 16,
    color: "#54707f",
    marginBottom: 32,
  },

  infoBox: {
    width: "100%",
    backgroundColor: "rgba(173, 216, 230, 0.55)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0f1720",
  },

  infoText: {
    fontSize: 16,
    marginBottom: 12,
    color: "#0f1720",
  },
});
