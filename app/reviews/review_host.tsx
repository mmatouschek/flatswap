import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ReviewHostScreen() {
  const router = useRouter();
  const [photosRating, setPhotosRating] = useState(0);

  const [cleanlinessRating, setCleanlinessRating] = useState(0);

  const [communicationRating, setCommunicationRating] = useState(0);

  const [recommendRating, setRecommendRating] = useState(0);

  const [reviewText, setReviewText] = useState("");

  const submitReview = () => {
    if (
      !photosRating ||
      !cleanlinessRating ||
      !communicationRating ||
      !recommendRating ||
      reviewText.length < 20
    ) {
      if (
        !photosRating ||
        !cleanlinessRating ||
        !communicationRating ||
        !recommendRating ||
        reviewText.length < 20
      ) {
        Alert.alert(
          "Missing information",
          "Please complete all ratings and write at least 20 characters",
        );

        return;
      }
    }

    router.push("/reviews/review_guest");
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
      <Text style={styles.title}>Review Host</Text>

      <Text style={styles.subtitle}>
        Rate your experience with the apartment and host
      </Text>

      <Text style={styles.label}>Apartment matched photos</Text>

      {renderRatingButtons(photosRating, setPhotosRating)}

      <Text style={styles.label}>Cleanliness</Text>

      {renderRatingButtons(cleanlinessRating, setCleanlinessRating)}

      <Text style={styles.label}>Communication</Text>

      {renderRatingButtons(communicationRating, setCommunicationRating)}

      <Text style={styles.label}>Would you recommend this host?</Text>

      {renderRatingButtons(recommendRating, setRecommendRating)}

      <TextInput
        placeholder="Write your review..."
        multiline
        numberOfLines={6}
        value={reviewText}
        onChangeText={setReviewText}
        style={[styles.input, styles.reviewInput]}
      />

      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Continue to Guest Review</Text>
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

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
    color: Colors.light.text,
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
    backgroundColor: Colors.light.tint,
  },

  ratingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.light.text,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginTop: 12,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },

  reviewInput: {
    height: 160,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: Colors.light.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
