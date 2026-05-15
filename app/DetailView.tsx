import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getUser } from "../backend/FlatSwapAPI";

export default function DetailView() {
  const route = useRoute();
  const { id } = route.params;
  const user = getUser(id);

  const [currentImage, setCurrentImage] = useState(1);
  const image_ref = {
    1: require("../backend/1/1.jpg"),
    2: require("../backend/2/1.jpg"),
  };

  const toggleImage = () => {
    setCurrentImage((prev) => (prev == 1 ? 2 : 1));
  };

  return (
    <View>
      <View
        style={styles.imageContainer}
        style={{
          width: "100%",
          height: "300",
          top: -50,
          backgroundColor: "#eee",
        }}
      >
        <Image
          source={image_ref[currentImage]}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={[styles.arrow, { left: 10 }]}
          onPress={toggleImage}
        >
          <FontAwesomeFreeSolid name={"angle-left"} size={12} color={"white"} />
        </TouchableOpacity>

        {/* Right Arrow */}
        <TouchableOpacity
          style={[styles.arrow, { right: 10 }]}
          onPress={toggleImage}
        >
          <FontAwesomeFreeSolid
            name={"angle-right"}
            size={12}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailWrapper}>
        <ScrollView>
          <View styles={styles.detailHeader}>
            <Text style={styles.headline}>
              <Text style={styles.username}>{user.name}'s</Text> Accomodation
            </Text>
            <Text style={styles.location}>
              <FontAwesomeFreeSolid
                name={"location-dot"}
                size={12}
                color={"black"}
              />{" "}
              {user.city}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Description: {user.description}</Text>
            <Text style={styles.text}>Trust Score: {user.trustscore}</Text>
            <Text style={styles.text}>Size: {user.size} m²</Text>
            <Text style={styles.text}>Beds: {user.beds}</Text>
            <Text style={styles.text}>
              Available: {user.startDate} to {user.endDate}
            </Text>
            <Text style={styles.text}>
              Coordinates: {user.latitude}, {user.longitude}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailWrapper: {
    position: "relative",
    top: -100,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  location: {
    fontSize: 16,
    color: "#555",
  },
  headline: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
  },
  text: { fontSize: 16 },
  username: {
    color: "#1ca349",
  },
  detailHeader: { borderWidth: 3, borderColor: "black" },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  arrow: {
    position: "absolute",
    top: "44%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
