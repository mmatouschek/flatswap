import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useState } from "react";

export default function SearchPreferencesScreen() {
  const [cityInput, setCityInput] = useState("");

  const [locations, setLocations] = useState<string[]>([]);

  const [guests, setGuests] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);

  const [showEndPicker, setShowEndPicker] = useState(false);

  const addLocation = () => {
    if (!cityInput.trim()) {
      return;
    }

    setLocations([...locations, cityInput]);

    setCityInput("");
  };

  const finishSetup = () => {
    if (locations.length === 0 || !guests) {
      Alert.alert("Missing fields", "Please complete all required fields.");

      return;
    }

    Alert.alert("Success", "Apartment and preferences created!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search Preferences</Text>

      <Text style={styles.subtitle}>Step 3: What are you looking for?</Text>

      <Text style={styles.sectionTitle}>Preferred Locations</Text>

      <View style={styles.locationRow}>
        <TextInput
          placeholder="City or district"
          value={cityInput}
          onChangeText={setCityInput}
          style={styles.locationInput}
        />

        <TouchableOpacity style={styles.addButton} onPress={addLocation}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {locations.map((location) => (
        <View key={location} style={styles.locationTag}>
          <Text>{location}</Text>
        </View>
      ))}

      <TextInput
        placeholder="Number of guests"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowStartPicker(true)}
      >
        <Text>Preferred From: {startDate.toDateString()}</Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);

            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowEndPicker(true)}
      >
        <Text>Preferred Until: {endDate.toDateString()}</Text>
      </TouchableOpacity>

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);

            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={finishSetup}>
        <Text style={styles.buttonText}>Post my Offer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingBottom: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    marginBottom: 32,
    fontSize: 14,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
  },

  locationRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  locationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  locationTag: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
