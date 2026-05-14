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
    <View style={styles.detailWrapper}>
      <ScrollView>
        <View styles={styles.detailHeader}>
          <Text style={styles.headline}>
            <Text style={styles.username}>{user.name}'s</Text> Accomodation (id
            = {id})
          </Text>
        </View>

        <Image
          source={image_ref[currentImage]}
          style={{ width: "100%", height: 300 }}
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

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Location: {user.city}</Text>
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
  );
}

const styles = StyleSheet.create({
  detailWrapper: { padding: 10, backgroundColor: "white" },
  headline: { fontSize: 20, color: "#555", alignSelf: "center" },
  text: { fontSize: 16 },
  username: {
    color: "#1ca349",
  },
  detailHeader: { alignContent: "center" },
  arrow: {
    position: "absolute",
    top: "31%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
  },
});
