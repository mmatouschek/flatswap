import { isUserLoggedIn } from "@/backend/services/AuthStorage";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import FlatSwapCalendarNew from "../components/ui/FlatSwapCalendarNew";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSearchData } from "./SearchData";
import { useCallback, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Modal,
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
  const navigation = useNavigation<any>();

  const [currentImage, setCurrentImage] = useState(1);
  const [requestSent, setRequestSent] = useState(false);
  const [buttonText, setButtonText] = useState("Request a swap with ");
  const [loggedIn, setLoggedIn] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(
    useSearchData((state) => state.startDate),
  );
  const [endDate, setEndDate] = useState(
    useSearchData((state) => state.endDate),
  );
  const [current, setCurrent] = useState(
    useSearchData((state) => state.current),
  );
  
  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, []),
  );
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
  const[popUpVisible, setPopUpVisible] = useState(false);
  
  const imageSource = "";
  console.log(
    "ID " + id + " currentImage " + currentImage + "imageSource " + imageSource,
  );

  const toggleImage = () => {
    setCurrentImage((prev) => (prev == 1 ? 2 : 1));
  };

  const checkLogin = async () => {
    const result = await isUserLoggedIn();

    setLoggedIn(result);
  };

  const handleButtonPress = () => {
    if (!loggedIn) {
      Alert.alert("Login required", "Please login before creating a trip.");
      navigation.navigate("Tab", { screen: "Profile" });
      return;
    } else {
	  setPopUpVisible(true);
    }
  };
	
  return (
    <View style={{ flex: 1 }}>
	
	<Modal transparent visible = {popUpVisible} animationType="fade">
	<View style = {{flex:1, paddingHorizontal:50, paddingVertical:100}}>
		<View style ={{flex:1, alignItems:"center", backgroundColor:"rgba(0, 0, 0, 0.8)"}}>
		<View style = {{flex:1}}/>
		<View style = {{flex:1}}>
		<Text style = {{fontWeight:"bold", fontSize:20, color: "white"}}>Do you want to request a swap?</Text>
		</View>
			<View style={{flex:10}}>
			<FlatSwapCalendarNew
				  startDate={startDate}
				  endDate={endDate}
				  isVisible={true}
				  onDatePress={(day) => {
					if (current == "start") {
					  setEndDate(null);
					  setStartDate(day.dateString);
					  setCurrent("end");
					} else {
					  const start = new Date(startDate);
					  const end = new Date(day.dateString);
					  if (end.getTime() > start.getTime()) {
						setEndDate(day.dateString);
						setCurrent("start");
					  } else {
						setStartDate(null);
						setEndDate(null);
						setCurrent("start");
					  }
					}
				  }}
				/>
			
				</View>
				<View style={{flex:2, justifyContent:"center", paddingHorizontal:25, alignItems:"right"}}>
				<Text style = {{fontWeight:"bold", fontSize:20, color: "white"}}>{"Select a time period for your swap!"} </Text>
				
				</View>
				<View style={{flex:2, flexDirection:"row"}}>
					<TouchableOpacity style={[styles.button,{flex:1, justifyContent:"center"}]} onPress = {()=>{
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
					setPopUpVisible(false);
					
					}
					
					}>
					
					<Text style={styles.buttonText}>
					  Send
					</Text>
				  </TouchableOpacity>
				  <TouchableOpacity style={[styles.button,{flex:1, justifyContent:"center"}]} onPress = {()=>setPopUpVisible(false)}>
					<Text style={styles.buttonText}>
					  Cancel
					</Text>
				  </TouchableOpacity>
				</View>
			</View>
		</View>
		
		
	</Modal>
	
	
      <View
        style={{
          width: "100%",
          height: 300,
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.headline}>
              <Text style={styles.username}>{user.name}'s</Text> Accomodation
            </Text>
            <Text style={styles.location}>
              {user.gender}, {user.age} years old
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
            <View style={styles.trustscoreRow}>
              <Text style={styles.location}>
                <FontAwesomeFreeSolid
                  name={"handshake"}
                  size={12}
                  color={"#1ca349"}
                />{" "}
                {user.trustscore}/1000 Trust ({user.numberOfRatings} Reviews)
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.detailsLink}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesomeFreeSolid name="times" size={20} color="#999" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              <Text style={{ color: "#1ca349" }}>{user.name}'s</Text> Trustscore
            </Text>
            <Text style={[styles.modalSubtitle, { fontSize: 12 }]}>
              {user.trustscore}/1000 From {user.numberOfRatings} Reviews
            </Text>

            <Text style={styles.metricsHeader}>Guest Ratings</Text>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Respect</Text>
              <Text style={styles.metricValue}>{user.guest.respectRating}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Cleanliness</Text>
              <Text style={styles.metricValue}>
                {user.guest.cleanlinessRating}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Rules</Text>
              <Text style={styles.metricValue}>{user.guest.rulesRating}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Punctuality</Text>
              <Text style={styles.metricValue}>
                {user.guest.punctualityRating}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Host Again</Text>
              <Text style={styles.metricValue}>
                {user.guest.hostAgainRating}
              </Text>
            </View>

            <Text style={styles.metricsHeader}>Host Ratings</Text>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Photos vs Reality</Text>
              <Text style={styles.metricValue}>{user.host?.photosRating}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Cleanliness</Text>
              <Text style={styles.metricValue}>
                {user.host?.cleanlinessRating}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Communication</Text>
              <Text style={styles.metricValue}>
                {user.host?.communicationRating}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Location Accuracy</Text>
              <Text style={styles.metricValue}>
                {user.host?.locationRating}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Would Recommend</Text>
              <Text style={styles.metricValue}>
                {user.host?.recommendRating}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
    position: "relative",
    top: -100,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 20,
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
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  headline: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 0,
  },
  text: { fontSize: 16, paddingBottom: 15 },
  labelText: { fontWeight: "bold", fontSize: 16, marginTop: 5 },
  username: {
    color: "#1ca349",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  arrow: {
    position: "absolute",
    top: "44%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  trustscoreRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsLink: {
    fontSize: 14,
    color: "#1ca349",
    textDecorationLine: "underline",
    marginLeft: 10,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  metricsHeader: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 14,
    color: "#555",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1ca349",
  },
  innerDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
});
