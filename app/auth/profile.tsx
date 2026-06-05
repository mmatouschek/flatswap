import AsyncStorage from "@react-native-async-storage/async-storage";

import { isUserLoggedIn, logoutUser } from "@/backend/services/AuthStorage";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useCallback, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      checkLogin();
      loadUser();
    }, []),
  );

  const checkLogin = async () => {
    const result = await isUserLoggedIn();

    setLoggedIn(result);
  };

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
      {loggedIn ? (
        <>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.username?.[0] || "A"}</Text>
          </View>

          <Text style={styles.title}>You are logged in 🎉</Text>

          <Text style={styles.subtitle}>Your account is active</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoText}>{user?.username || "-"}</Text>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>{user?.email || "-"}</Text>
            <Text style={styles.infoLabel}>Country</Text>
            <Text style={styles.infoText}>{user?.country || "-"}</Text>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoText}>{user?.age || "-"}</Text>
            <Text style={styles.infoLabel}>About you</Text>
            <Text style={styles.infoText}>{user?.about || "-"}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await logoutUser();
              setLoggedIn(false);
            }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome to FlatSwap</Text>
          <Text style={styles.subtitle}>Login or create an account</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.secondaryButton]}
            onPress={() => navigation.navigate("Create Account")}
          >
            <Text style={styles.secondaryButtonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8fb",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    position: "absolute",
    top: 60,
    right: 24,
  },

  editText: {
    color: "#1ca349",
    fontSize: 16,
    fontWeight: "600",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
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
    fontSize: 42,
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f1720",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#54707f",
    marginBottom: 32,
    textAlign: "center",
  },

  infoBox: {
    width: "100%",
    backgroundColor: "rgba(173, 216, 230, 0.55)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  infoLabel: {
    color: "#54707f",
    fontSize: 13,
    marginBottom: 4,
    marginTop: 12,
  },

  infoText: {
    fontSize: 16,
    color: "#0f1720",
    fontWeight: "500",
  },

  button: {
    backgroundColor: "rgba(173, 216, 230, 0.4)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(217, 83, 79, 0.1)",
  },

  buttonText: {
    color: "#d9534f",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#1ca349",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "rgba(173, 216, 230, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  secondaryButtonText: {
    color: "#0f1720",
    fontWeight: "bold",
    fontSize: 16,
  },

  editProfileButton: {
    position: "absolute",
    top: 60,
    right: 24,
    backgroundColor: "#eef7fa",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  editProfileText: {
    color: "#0f1720",
    fontWeight: "600",
    fontSize: 14,
  },
});
