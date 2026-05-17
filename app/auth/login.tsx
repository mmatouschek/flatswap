import { loginUser, validateUser } from "@/backend/services/AuthStorage";

import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FlatSwap!</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <TextInput
        ref={passwordRef}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={async () => {
          if (!email || !password) {
            Alert.alert("Missing fields", "Please enter email and password.");

            return;
          }

          const user = await validateUser(email, password);

          if (!user) {
            Alert.alert("Login failed", "Invalid email or password.");

            return;
          }

          await loginUser();

          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.registerText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f3f8fb",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#0f1720",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "rgba(173, 216, 230, 0.55)",
    color: "#0f1720",
  },

  loginButton: {
    backgroundColor: "#1ca349",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  registerText: {
    color: "#1ca349",
    fontSize: 16,
    fontWeight: "600",
  },
});
