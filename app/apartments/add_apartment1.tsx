import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";

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
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const tripData = route.params?.tripData;
  const editIndex = route.params?.editIndex;
  const [title, setTitle] = useState(tripData?.title || "");
  const [location, setLocation] = useState(tripData?.locations?.[0] || "");
  const [guests, setGuests] = useState(tripData?.guests?.toString() || "");
  const [startDate, setStartDate] = useState(
    tripData?.startDate ? new Date(tripData.startDate) : new Date(),
  );

  const [endDate, setEndDate] = useState(
    tripData?.endDate ? new Date(tripData.endDate) : new Date(),
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const locationRef = useRef<TextInput>(null);
  const guestsRef = useRef<TextInput>(null);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route.params]);

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

    navigation.navigate("AddApartment2", {
      editIndex,
      tripData: {
        ...tripData,
        title,
        locations: [location],
        guests,
        startDate,
        endDate,
      },
    });
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
      <Text style={styles.title}>
        {editIndex !== undefined ? "Edit Apartment" : "Add Apartment"}
      </Text>

      <Text style={styles.subtitle}>Step 1: Basic Information</Text>

      <Text style={styles.sectionTitle}>Title</Text>
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
        onPress={() => navigation.navigate("Select Location")}
      >
        <Text style={styles.mapButtonText}>📍 Choose location on Map</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Apartments are aviable:</Text>
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

      <Text style={styles.sectionTitle}>Number of Guests</Text>
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

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
    color: "#0f1720",
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    borderColor: "rgba(28, 163, 73, 0.1)",
    backgroundColor: "rgba(173, 216, 230, 0.55)",
    color: "#0f1720",
  },

  suggestionsBox: {
    backgroundColor: "rgba(173, 216, 230, 0.55)",

    borderRadius: 12,

    marginTop: -8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  suggestionItem: {
    padding: 14,

    borderBottomWidth: 1,

    borderBottomColor: "rgba(28, 163, 73, 0.08)",
  },

  orText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#54707f",
    fontWeight: "600",
  },

  mapButton: {
    backgroundColor: "rgba(173, 216, 230, 0.55)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
  },

  mapButtonText: {
    fontWeight: "600",
    color: "#1ca349",
  },

  dateRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "rgba(173, 216, 230, 0.55)",
  },

  dateText: {
    color: "#0f1720",
    fontWeight: "500",
    textAlign: "center",
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
