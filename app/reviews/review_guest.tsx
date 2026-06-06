import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReviewGuestScreen() {
  const navigation = useNavigation<any>();

  const [respectRating, setRespectRating] = useState(50);
  const [cleanlinessRating, setCleanlinessRating] = useState(50);
  const [rulesRating, setRulesRating] = useState(50);
  const [punctualityRating, setPunctualityRating] = useState(50);
  const [hostAgainRating, setHostAgainRating] = useState(50);

  const [reviewText, setReviewText] = useState("");

  const totalScore =
    respectRating +
    cleanlinessRating +
    rulesRating +
    punctualityRating +
    hostAgainRating;

  const submitReview = () => {
    Alert.alert("Success", `Guest review submitted!`, [
      {
        text: "OK",
        onPress: () => {
          navigation.pop(2);
        },
      },
    ]);
  };

  const renderSlider = (
    label: string,
    value: number,
    setValue: (value: number) => void,
  ) => {
    return (
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.label}>{label}</Text>

          <Text style={styles.scoreText}>{value}</Text>
        </View>

        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#1ca349"
          maximumTrackTintColor="#cfe3ea"
          thumbTintColor="#1ca349"
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review Guest</Text>

      <Text style={styles.subtitle}>Rate your experience with the guest</Text>

      {renderSlider("Respect for apartment", respectRating, setRespectRating)}

      {renderSlider(
        "Cleanliness after stay",
        cleanlinessRating,
        setCleanlinessRating,
      )}

      {renderSlider("Following house rules", rulesRating, setRulesRating)}

      {renderSlider("Punctuality", punctualityRating, setPunctualityRating)}

      {renderSlider(
        "Would you host again?",
        hostAgainRating,
        setHostAgainRating,
      )}

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Guest Trust Score</Text>

        <Text style={styles.totalScore}>{totalScore}/500</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
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

  sliderContainer: {
    marginBottom: 24,
  },

  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f1720",
    flex: 1,
    marginRight: 12,
  },

  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1ca349",
  },

  totalBox: {
    backgroundColor: "#eef7fa",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.08)",
  },

  totalLabel: {
    fontSize: 16,
    color: "#54707f",
    marginBottom: 8,
  },

  totalScore: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1ca349",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(28, 163, 73, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginTop: 12,
    backgroundColor: "#eef7fa",
    color: "#0f1720",
  },

  button: {
    backgroundColor: "#1ca349",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
