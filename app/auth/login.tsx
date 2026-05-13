import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const passwordRef = useRef<TextInput>(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FlatSwap!</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={() => {
          console.log("Login");
        }}
      />

      <TouchableOpacity style={styles.loginButton}>
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
    backgroundColor: Colors.light.background,
  },

  title: {
    fontSize: 28,
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

  loginButton: {
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

  registerButton: {
    marginTop: 20,
    alignItems: "center",
  },

  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  registerText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "600",
  },
});
