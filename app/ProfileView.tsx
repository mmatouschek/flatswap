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

export default function ProfileView() {
  const route = useRoute();
  const { id } = route.params;
  const user = getUser(id);

  const [currentImage, setCurrentImage] = useState(1);

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
          source={image_ref[(id - 1) * 2 + currentImage]}
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
                color={"#1ca349"}
              />{" "}
              {user.city}
            </Text>
            <Text style={styles.location}>
              <FontAwesomeFreeSolid
                name={"calendar"}
                size={12}
                color={"#1ca349"}
              />{" "}
              Available from {user.startDate.split("-").reverse().join(".")} to{" "}
              {user.endDate.split("-").reverse().join(".")}
            </Text>
            <Text style={styles.location}>
              <FontAwesomeFreeSolid
                name={"handshake"}
                size={12}
                color={"#1ca349"}
              />{" "}
              {user.trustscore}/1000 Trust
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={{}}>
            <Text style={styles.labelText}>About this accomodation</Text>
            <Text style={styles.text}>{user.description}</Text>

            <Text style={styles.labelText}>Size</Text>
            <Text style={styles.text}> {user.size} m²</Text>

            <Text style={styles.labelText}>Beds</Text>
            <Text style={styles.text}>{user.beds}</Text>

            {/*<Text style={styles.labelText}>Coordinates</Text>
            <Text style={styles.text}>
              {user.latitude}, {user.longitude}
            </Text>*/}
          </View>
          <TouchableOpacity style={styles.button} onPress={async () => {}}>
            <Text style={styles.buttonText}>
              Request a swap with {user.name}!
            </Text>
          </TouchableOpacity>
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

  button: {
    backgroundColor: "#1ca349",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "white",
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
  text: { fontSize: 16, paddingBottom: 15 },
  labelText: { fontWeight: "bold", fontSize: 16 },
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
