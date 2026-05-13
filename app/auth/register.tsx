import { Colors } from "@/constants/theme";
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

  return (
    <View style={styles.container}>
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
          if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Missing fields", "Please fill in all fields.");

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
          });

          await loginUser();

          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.light.background,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: Colors.light.text,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },

  registerButton: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: Colors.light.background,
    fontWeight: "bold",
    fontSize: 16,
  },

  footerText: {
    marginTop: 24,
    textAlign: "center",
    color: Colors.light.text,
  },
});
