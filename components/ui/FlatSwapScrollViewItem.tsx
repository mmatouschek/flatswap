import React from "react";
import { View, Image, Text } from "react-native";
import {getUser, getApartmentPictures} from "../../backend/FlatSwapAPI"
import FlatSwapText from "./FlatSwapText";
type Properties = {
  id:number;
};


export default function ScrollListItem({id}: Properties) {
	const user = getUser(id);
	const green = Math.round(((user.trustscore - 100) / 900) * 255);
	const red = 255-green;
	const color = `rgb(${red}, ${green}, 0)`;
  return (	
		<View style={{flex:1, flexDirection: "column",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:"rgba(173, 216, 230, 0.7)"}}>
		<View style={{height:300, width: "100%", backgroundColor:"black"}}>
		{getApartmentPictures(user.id)[0]}
		<View
          style={{
            backgroundColor: color,
            padding: 6,
            borderRadius: 10,
			width:70,
			height:40,
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: "5%",
			left: "81%",
			
          }}
        >
          <Text style={{ color: "white" }}>
            {user.trustscore}
          </Text>
		</View>
		
		
		
		</View>
		
		
		<FlatSwapText title={user.name} />
		
		<FlatSwapText title={user.description} />
		</View>
  );
}

