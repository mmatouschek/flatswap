import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  DeviceEventEmitter,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getApartmentPictures, getUser } from "../backend/FlatSwapAPI";
//import userData from "../backend/user_images.json";

export default function DetailView() {
  const route = useRoute();
  const { id } = route.params;
  const user = getUser(id);

  const [currentImage, setCurrentImage] = useState(1);
  const [requestSent, setRequestSent] = useState(false);
  const [buttonText, setButtonText] = useState("Request a swap with ");

  /*
  let imageSource;
  if (id <= 20) {
    const base64Data = userData[id][currentImage + ".jpg"];

    imageSource = base64Data
      ? { uri: `data:image/jpeg;base64,${base64Data}` }
      : null;
  } else {
    imageSource = "";
  }*/

  const imageSource = "";
  console.log(
    "ID " + id + " currentImage " + currentImage + "imageSource " + imageSource,
  );
  const toggleImage = () => {
    setCurrentImage((prev) => (prev == 1 ? 2 : 1));
  };

  const handleButtonPress = () => {
    DeviceEventEmitter.emit("ADD_OUTGOING_REQUEST", {
      id: Date.now(),
      userId: id,
      name: user.name,
      startDate: user.startDate,
      endDate: user.endDate,
      message: "Would love to do a month-long swap in Vienna!",
      outgoing: 1,
    });
    setRequestSent(true);
    setButtonText("Request sent to ");
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: "300",
          top: -50,
          backgroundColor: "#eee",
        }}
      >
        {getApartmentPictures(id)[currentImage - 1]}
        <TouchableOpacity
          style={[styles.arrow, { left: 10 }]}
          onPress={toggleImage}
        >
          <FontAwesomeFreeSolid name={"angle-left"} size={12} color={"white"} />
        </TouchableOpacity>

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
          <TouchableOpacity
            style={[styles.button, requestSent && styles.buttonDisabled]}
            disabled={requestSent}
            onPress={handleButtonPress}
          >
            <Text style={styles.buttonText}>
              {buttonText}
              {user.name}!
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

  buttonDisabled: {
    backgroundColor: "#999",
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
