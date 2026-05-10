import { View, Text, StyleSheet, ScrollView} from "react-native";
import FlatSwapButton from "../components/ui/FlatSwapButton";
import FlatSwapText from "../components/ui/FlatSwapText";
import FlatSwapScrollViewItem from "../components/ui/FlatSwapScrollViewItem";
import FlatSwapScrollList from "../components/ui/FlatSwapScrollList";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import React, { useState } from "react";
import { useRouter, Slot, Redirect  } from "expo-router";
import MapView, { Marker, Circle } from "react-native-maps";
import { Alert } from "react-native";
import getAllUsers, {getUser, getResults, getApartmentPictures} from "../backend/FlatSwapAPI"


export default function ListSearch() {
const [query, setQuery] = useState("");
const [searchResult, setSearchResult] = useState([]);
  return (
		
		<View style={{ flex: 1, padding: 20}}>
		<View style = {{flex:1}}>
		<FlatSwapInput
		value={query}
		onChangeText={setQuery}
		onSubmitEditing={()=>{
			const result = getResults(query);
			if (result.length>0){
				setSearchResult(result);
			}
			else{
				const message = `Unfortunately there are no swappers in ${query}!`;
				Alert.alert("No results", message,
				[{ text: "OK", onPress: () => {} }]);
			
			}
		}}
		placeholder="..."/>
		</View>
		<View style={{flex: 6}}>
		<FlatSwapScrollList searchResult={searchResult}/>
		</View>
    </View>

);
  }

