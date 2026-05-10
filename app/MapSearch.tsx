import { View, Text, StyleSheet, ScrollView} from "react-native";
import FlatSwapButton from "../components/ui/FlatSwapButton";
import FlatSwapText from "../components/ui/FlatSwapText";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import FlatSwapMap from "../components/ui/FlatSwapMap";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import { useState } from "react";
import { useRouter  } from "expo-router";
import MapView, { Marker, Circle } from "react-native-maps";
import getAllUsers, {getUser, getResults, getApartmentPictures} from "../backend/FlatSwapAPI"



export default function MapSearch() {
const [query, setQuery] = useState("");
const results = getAllUsers();
const [lat, setLat] = useState(48.2090);
const [long, setLong]= useState(16.3808);
  return (
		
		<View style={{ flex: 1, padding: 20}}>
		<View style = {{flex:1}}>
		<FlatSwapInput
		value={query}
		onChangeText={setQuery}
		onSubmitEditing={()=>{
			const result = getResults(query);
			
			if (result.length>0){
				setLat(result[0].latitude);
				setLong(result[0].longitude);
			}
			else{
				console.log("No Results");
			
			}
		}}
		placeholder="..."/>
		<FlatSwapButton
		title=" "
		onPress={() => {console.log("render map:", lat, long)}}
        />
		</View>
		<FlatSwapMap style={{flex: 5}} latitude={lat} longitude={long} />
    </View>

);
  }