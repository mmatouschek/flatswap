import { View, Text, StyleSheet, ScrollView} from "react-native";
import FlatSwapButton from "../components/ui/FlatSwapButton";
import FlatSwapText from "../components/ui/FlatSwapText";
import FlatSwapScrollViewItem from "../components/ui/FlatSwapScrollViewItem";
import FlatSwapScrollList from "../components/ui/FlatSwapScrollList";
import FlatSwapCalendar from "../components/ui/FlatSwapCalendar";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import FlatSwapIconButton from "../components/ui/FlatSwapIconButton";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import React, { useState } from "react";
import ListSearch from "./ListSearch";
import MapSearch from "./MapSearch";
import { useRouter, Slot, Redirect  } from "expo-router";
import MapView, { Marker, Circle } from "react-native-maps";
import { Alert } from "react-native";
import getAllUsers, {getUser, getResults, getApartmentPictures, filterDate} from "../backend/FlatSwapAPI"
import { Calendar } from 'react-native-calendars';
import {useSearchData} from "./SearchData"


export default function SearchTabs() {
const [page, setPage] = useState(true);



	if (page){
	return (
	<View style ={{flex:1, flexDirection: "column"}}>
	<View style ={{flex:1, flexDirection: "column", justifyContent: "center"}}>
		<View style = {{flex:1, padding:4, flexDirection: "row", justifyContent: "center"}}>
			<FlatSwapButton style={[DefaultStyles.button,{flex:1, backgroundColor:"rgba(173, 216, 230,0.3)"}]} title = "List" onPress={()=>{setPage(false);}}/>
			<FlatSwapButton style={[DefaultStyles.button,{flex:1, backgroundColor:"rgba(173, 216, 230,1)"}]} title = "Map" onPress={()=>{setPage(true);}}/>
		</View>
	</View>
	<View style = {{flex: 70}}>
		<MapSearch />
	</View>
	</View>
  );}
  else{
	return (
	<View style ={{flex:1, flexDirection: "column"}}>
	<View style ={{flex:1, flexDirection: "column", justifyContent: "center"}}>
		<View style = {{flex:1, padding:4, flexDirection: "row", justifyContent: "center"}}>
		<FlatSwapButton style={[DefaultStyles.button,{flex:1, backgroundColor:"rgba(173, 216, 230,1)"}]} title = "List" onPress={()=>{setPage(false);}}/>
		<FlatSwapButton style={[DefaultStyles.button,{flex:1, backgroundColor:"rgba(173, 216, 230,0.3)"}]} title = "Map" onPress={()=>{setPage(true);}}/>
	</View>
	</View>
	<View style = {{flex: 70}}>
		<ListSearch />
	</View>
	</View>
  );  
  
  }
}