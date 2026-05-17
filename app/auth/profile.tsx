import AsyncStorage from "@react-native-async-storage/async-storage";

import { isUserLoggedIn, logoutUser } from "@/backend/services/AuthStorage";

import { Colors } from "@/constants/theme";

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

            <Text style={styles.infoLabel}>About</Text>

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
            onPress={() => navigation.navigate("CreateAccount")}
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
    backgroundColor: Colors.light.background,
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
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "600",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.light.tint,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 24,
  },

  avatarText: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 32,
    textAlign: "center",
  },

  infoBox: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },

  infoLabel: {
    color: "#777",
    fontSize: 13,
    marginBottom: 4,
    marginTop: 12,
  },

  infoText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#d9534f",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  loginButtonText: {
    color: Colors.light.background,
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
  editProfileButton: {
    position: "absolute",
    top: 60,
    right: 24,

    backgroundColor: Colors.light.tint,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  editProfileText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
