import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { Colors } from "@/constants/theme";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddApartmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const locationRef = useRef<TextInput>(null);
  const guestsRef = useRef<TextInput>(null);

  useEffect(() => {
    if (params.selectedLocation) {
      setLocation(params.selectedLocation as string);
    }
  }, [params.selectedLocation]);

  const searchLocation = async (text: string) => {
    setLocation(text);

    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${text}&format=json`,
      );

      const data = await response.json();

      const formatted = data.map((item: any) => item.display_name);

      setSuggestions(formatted.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = () => {
    if (!title || !guests || !location) {
      Alert.alert("Missing fields", "Please fill in all required fields.");

      return;
    }

    router.push("/apartments/add_apartment2");
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
      <Text style={styles.title}>Add Apartment</Text>

      <Text style={styles.subtitle}>Step 1: Basic Information</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => locationRef.current?.focus()}
      />

      <Text style={styles.sectionTitle}>Location</Text>

      <TextInput
        ref={locationRef}
        placeholder="Search district or city"
        value={location}
        onChangeText={searchLocation}
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => guestsRef.current?.focus()}
      />

      {location.length > 0 && !suggestions.includes(location) && (
        <View style={styles.suggestionsBox}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.suggestionItem}
              onPress={() => {
                setLocation(item);
                setSuggestions([]);
              }}
            >
              <Text numberOfLines={1}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => router.push("/apartments/select_location")}
      >
        <Text style={styles.mapButtonText}>📍 Choose location on Map</Text>
      </TouchableOpacity>

      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.dateText}>📅 {formatDate(startDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.dateText}>📅 {formatDate(endDate)}</Text>
        </TouchableOpacity>
      </View>

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

      <TextInput
        ref={guestsRef}
        placeholder="Max number of Guests"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={goNext}
      />

      <TouchableOpacity style={styles.button} onPress={goNext}>
        <Text style={styles.buttonText}>Next</Text>
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

  suggestionsBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginTop: -8,
    marginBottom: 16,
  },

  suggestionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  orText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#777",
    fontWeight: "600",
  },

  mapButton: {
    backgroundColor: "#e8f0ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  mapButtonText: {
    fontWeight: "600",
    color: Colors.light.tint,
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
});
