import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
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
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const tripData = route.params?.tripData;
  const editIndex = route.params?.editIndex;
  const [size, setSize] = useState(tripData?.size || "");
  const [description, setDescription] = useState(tripData?.description || "");

  const [image, setImage] = useState<string | null>(tripData?.image || null);

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
      Alert.alert(
        "Missing information",
        "Please upload a photo and write at least 50 characters.",
      );

      return;
    }

    navigation.navigate("Preferences", {
      editIndex,
      tripData: { ...tripData, description, size, image },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {editIndex !== undefined ? "Edit Apartment" : "Apartment Details"}
      </Text>
      <Text style={styles.subtitle}>Step 2: Add photos & description</Text>

      <Text style={styles.sectionTitle}>Apartments size(m²)</Text>
      <TextInput
        placeholder="Apartments size"
        keyboardType="numeric"
        value={size}
        onChangeText={setSize}
        style={styles.input}
        returnKeyType="done"
      />

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <Text style={styles.sectionTitle}>Some words about yout apartment</Text>
      <TextInput
        placeholder="Description (min. 50 characters)"
        multiline
        numberOfLines={6}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.descriptionInput]}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {image ? "Change Apartment Photo" : "Upload Apartment Photo"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={publishApartment}>
        <Text style={styles.buttonText}>Go to Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f3f8fb",
    flexGrow: 1,
    paddingBottom: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: "#0f1720",
  },

  subtitle: {
    textAlign: "center",
    color: "#54707f",
    marginTop: 8,
    marginBottom: 32,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#eef7fa",
    color: "#0f1720",
  },

  descriptionInput: {
    height: 180,
    textAlignVertical: "top",
  },

  imageButton: {
    backgroundColor: "#eef7fa",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
  },

  imageButtonText: {
    fontWeight: "600",
    color: "#1ca349",
  },

  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
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
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
    color: "#0f1720",
  },
});
