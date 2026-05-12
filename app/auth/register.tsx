import { Colors } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Username" style={styles.input} />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.registerButton}>
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
