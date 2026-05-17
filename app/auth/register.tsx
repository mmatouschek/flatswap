import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { loginUser, registerUser } from "@/backend/services/AuthStorage";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();

  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [country, setCountry] = useState("");

  const [age, setAge] = useState("");

  const [about, setAbout] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />

      <TextInput
        ref={emailRef}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />

      <TextInput
        placeholder="Age (optional)"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Something about you (optional)"
        value={about}
        onChangeText={setAbout}
        multiline
        style={[styles.input, styles.aboutInput]}
      />

      <TextInput
        ref={passwordRef}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
      />

      <TextInput
        ref={confirmPasswordRef}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={async () => {
          if (
            !username ||
            !email ||
            !password ||
            !confirmPassword ||
            !country
          ) {
            Alert.alert(
              "Missing fields",
              "Please fill in all required fields.",
            );

            return;
          }

          if (password !== confirmPassword) {
            Alert.alert("Password mismatch", "Passwords do not match.");

            return;
          }

          await registerUser({
            username,
            email,
            password,
            country,
            age,
            about,
          });

          await loginUser();

          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingBottom: 60,
    backgroundColor: "#f3f8fb",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#0f1720",
  },

  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: "rgba(173, 216, 230, 0.55)",
    color: "#0f1720",
    fontSize: 16,
  },

  aboutInput: {
    height: 120,
    textAlignVertical: "top",
  },

  registerButton: {
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
});
