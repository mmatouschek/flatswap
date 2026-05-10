import { View, Text, StyleSheet, ScrollView} from "react-native";
import FlatSwapButton from "./ui/FlatSwapButton";
import FlatSwapText from "./FlatSwapText";
import FlatSwapScrollViewItem from "./FlatSwapScrollViewItem";
import { DefaultStyles } from "./DefaultStyles";
import React, { useState } from "react";
import { useRouter, Slot, Redirect  } from "expo-router";
import MapView, { Marker, Circle } from "react-native-maps";
import getAllUsers, {getUser, getResults, getApartmentPictures} from "../../backend/FlatSwapAPI"

type Props = {
  searchResult: any[];
};



export default function FlatSwapScrollList({searchResult}:Props) {





if (searchResult.length<1){
return <ScrollView style={{ flex:1 }} />

}
return(
<ScrollView style={{ flex:1 }}>

{searchResult.map((item) => {
	console.log("-------------------------------------");
			console.log(item);
	console.log("-------------------------------------");
  return (
    <View key={item.id} style={{ padding: 10 }}>
      <FlatSwapScrollViewItem id={item.id} />
    </View>
  );
})}

</ScrollView>
);
}