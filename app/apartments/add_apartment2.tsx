import { Colors } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AddApartmentDetailsScreen() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const publishApartment = () => {
    if (description.length < 50) {
      // (!image || description.length < 50)
      Alert.alert(
        "Missing information",
        "Please upload a photo and write at least 50 characters.",
      );

      return;
    }

    router.push("/apartments/search_preferences");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Apartment Details</Text>

      <Text style={styles.subtitle}>Step 2: Add photos & description</Text>

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Upload Apartment Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TextInput
        placeholder="Description (min. 50 characters)"
        multiline
        numberOfLines={6}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.descriptionInput]}
      />

      <TouchableOpacity style={styles.button} onPress={publishApartment}>
        <Text style={styles.buttonText}>Go to Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.light.background,
    flexGrow: 1,
    paddingBottom: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: Colors.light.text,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.light.text,
    marginTop: 8,
    marginBottom: 32,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },

  descriptionInput: {
    height: 180,
    textAlignVertical: "top",
  },

  imageButton: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  imageButtonText: {
    fontWeight: "600",
    color: Colors.light.text,
  },

  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
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
