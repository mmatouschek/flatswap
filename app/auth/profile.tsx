import { Colors } from "@/constants/theme";

import { isUserLoggedIn, logoutUser } from "@/backend/services/AuthStorage";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useCallback, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const [loggedIn, setLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, []),
  );

  const checkLogin = async () => {
    const result = await isUserLoggedIn();

    setLoggedIn(result);
    <Text style={styles.title}></Text>;
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.title}>You are logged in 🎉</Text>

          <Text style={styles.subtitle}>Your account is active</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              alert("Profile details page coming soon 👤");
            }}
          >
            <Text style={styles.profileButtonText}>Open My Profile</Text>
          </TouchableOpacity>

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

  button: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: Colors.light.text,
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
  profileButton: {
    width: "100%",
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  profileButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "600",
  },
});
