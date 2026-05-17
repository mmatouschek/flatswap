import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation<any>();
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
    navigation.goBack();
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
        placeholder="About you"
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
    backgroundColor: "#f3f8fb",
    flexGrow: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 40,
    textAlign: "center",
    color: "#0f1720",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: "#eef7fa",
    color: "#0f1720",
    fontSize: 16,
  },

  disabledInput: {
    backgroundColor: "#e8f2f5",
    color: "#54707f",
  },

  aboutInput: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#1ca349",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
