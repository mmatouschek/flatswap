import { saveTrip } from "@/backend/services/UserStorage";
import { Colors } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchPreferencesScreen() {
  const [cityInput, setCityInput] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [guests, setGuests] = useState("");
  const [useSameDates, setUseSameDates] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const navigation = useNavigation<any>();

  const addLocation = () => {
    const trimmed = cityInput.trim();

    if (!trimmed) {
      return;
    }

    if (locations.includes(trimmed)) {
      Alert.alert("Already added", "This location already exists.");

      return;
    }

    setLocations([...locations, trimmed]);

    setCityInput("");
  };

  const finishSetup = async () => {
    if (locations.length === 0 || !guests) {
      Alert.alert("Missing fields", "Please complete all required fields.");

      return;
    }

    const trip = {
      locations,
      guests,
      startDate,
      endDate,
      createdAt: new Date(),
    };

    await saveTrip(trip);

    Alert.alert("Success 🎉", "Your offer has been created!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Your Trip");
        },
      },
    ]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
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

      {locations.map((location, index) => (
        <View key={index} style={styles.locationTag}>
          <Text style={styles.locationText}>{location}</Text>

          <TouchableOpacity
            onPress={() => {
              const updated = locations.filter((_, i) => i !== index);

              setLocations(updated);
            }}
          >
            <Text style={styles.deleteLocation}>✕</Text>
          </TouchableOpacity>
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
        style={styles.checkboxRow}
        onPress={() => setUseSameDates(!useSameDates)}
        activeOpacity={0.7}
      >
        <View style={styles.checkbox}>
          {useSameDates && <View style={styles.checkboxInner} />}
        </View>

        <Text style={styles.checkboxText}>Use same travel dates</Text>
      </TouchableOpacity>

      {!useSameDates && (
        <View style={styles.dateRow}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowStartPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dateText}>📅 {formatDate(startDate)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowEndPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dateText}>📅 {formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
      )}

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

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
    color: Colors.light.text,
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

  locationRow: {
    flexDirection: "row",
    gap: 12,
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
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },

  addButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: Colors.light.background,
    fontWeight: "bold",
    fontSize: 16,
  },

  locationTag: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: Colors.light.tint,
  },

  checkboxText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },

  dateRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  dateText: {
    color: Colors.light.text,
    fontWeight: "500",
    textAlign: "center",
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
  locationText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },

  deleteLocation: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f",
  },
});
