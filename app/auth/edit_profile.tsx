import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function EditProfile() {
  const [user, setUser] = useState<any>(null);

  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("");

  const [age, setAge] = useState("");

  const [about, setAbout] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const savedUsers = await AsyncStorage.getItem("users");

    if (!savedUsers) {
      return;
    }

    const parsed = JSON.parse(savedUsers);

    const currentUser = parsed[parsed.length - 1];

    setUser(currentUser);

    setEmail(currentUser.email);
    setCountry(currentUser.country);
    setAge(currentUser.age);
    setAbout(currentUser.about);
  };

  const saveChanges = async () => {
    const savedUsers = await AsyncStorage.getItem("users");

    if (!savedUsers) {
      return;
    }

    const parsed = JSON.parse(savedUsers);

    parsed[parsed.length - 1] = {
      ...parsed[parsed.length - 1],
      email,
      country,
      age,
      about,
    };

    await AsyncStorage.setItem("users", JSON.stringify(parsed));

    Alert.alert("Saved", "Profile updated successfully.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        editable={false}
        value={user?.username || ""}
        style={[styles.input, styles.disabledInput]}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="About"
        value={about}
        onChangeText={setAbout}
        multiline
        style={[styles.input, styles.aboutInput]}
      />

      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: Colors.light.background,
    flexGrow: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 40,
    textAlign: "center",
    color: Colors.light.text,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    fontSize: 16,
  },

  disabledInput: {
    backgroundColor: "#f2f2f2",
    color: "#888",
  },

  aboutInput: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: Colors.light.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
