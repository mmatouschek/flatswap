import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

export default function ReviewGuestScreen() {
  const [respectRating, setRespectRating] = useState(0);

  const [cleanlinessRating, setCleanlinessRating] = useState(0);

  const [communicationRating, setCommunicationRating] = useState(0);

  const [hostAgainRating, setHostAgainRating] = useState(0);

  const [reviewText, setReviewText] = useState("");

  const submitReview = () => {
    if (
      !respectRating ||
      !cleanlinessRating ||
      !communicationRating ||
      !hostAgainRating ||
      reviewText.length < 20
    ) {
      Alert.alert(
        "Missing information",
        "Please complete all ratings and write at least 20 characters.",
      );

      return;
    }

    Alert.alert("Guest and Host reviews submitted. Thank you!");
  };

  const renderRatingButtons = (
    selected: number,
    setSelected: (value: number) => void,
  ) => {
    return (
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((number) => (
          <TouchableOpacity
            key={number}
            style={[
              styles.ratingButton,
              selected === number && styles.selectedRating,
            ]}
            onPress={() => setSelected(number)}
          >
            <Text style={styles.ratingText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review Guest</Text>

      <Text style={styles.subtitle}>Rate your experience with the guest</Text>

      <Text style={styles.label}>Respect for apartment</Text>

      {renderRatingButtons(respectRating, setRespectRating)}

      <Text style={styles.label}>Cleanliness</Text>

      {renderRatingButtons(cleanlinessRating, setCleanlinessRating)}

      <Text style={styles.label}>Communication</Text>

      {renderRatingButtons(communicationRating, setCommunicationRating)}

      <Text style={styles.label}>Would you host this guest again?</Text>

      {renderRatingButtons(hostAgainRating, setHostAgainRating)}

      <TextInput
        placeholder="Write your review..."
        multiline
        numberOfLines={6}
        value={reviewText}
        onChangeText={setReviewText}
        style={[styles.input, styles.reviewInput]}
      />

      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Submit Reviews</Text>
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

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
  },

  ratingRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  ratingButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedRating: {
    backgroundColor: "#2563eb",
  },

  ratingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginTop: 12,
  },

  reviewInput: {
    height: 160,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
