import { View, Text, StyleSheet, ScrollView} from "react-native";
import FlatSwapButton from "./FlatSwapButton";
import FlatSwapText from "./FlatSwapText";
import FlatSwapInput from "./FlatSwapInput";
import { DefaultStyles } from "./DefaultStyles";
import { useState, Fragment } from "react";
import { useRouter  } from "expo-router";
import MapView, { Marker, Circle } from "react-native-maps";
import getAllUsers, {getUser, getResults, getApartmentPictures} from "../../backend/FlatSwapAPI"



type MapProps = {
  latitude: string;
  longitude: number;
  searchResult: any[];
};


export default function FlatSwapMap({latitude, longitude, searchResult}: MapProps ) {
const results = searchResult;
let delta = 0.05;
if(results.length<1)
{
delta = 4;
}
  return (
		
      <MapView
        style={{ flex: 4 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
      >
	  {results.map((item) => {
  const green = Math.round(((item.trustscore - 100) / 900) * 255);
  const red = 255-green;
  const color = `rgb(${red}, ${green}, 0)`;

  return (
    <Fragment key={item.id}>
      <Circle
        key={`circle-${item.id}`}
        center={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        radius={400}
        fillColor="rgba(37, 99, 235, 0.2)"
        strokeColor="rgba(37, 99, 235, 0.6)"
        strokeWidth={1}
      />

      <Marker
        key={`marker-${item.id}`}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        onPress={() => {
          console.log("marker clicked");
        }}
      >
        <View
          style={{
            backgroundColor: color,
            padding: 6,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>
            {item.trustscore}
          </Text>
        </View>
      </Marker>
	  
    </Fragment>
  );
})}
	  
      </MapView>



);
  }
  
  
  function formatDate(date: string){

return `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(2,4)}`

}