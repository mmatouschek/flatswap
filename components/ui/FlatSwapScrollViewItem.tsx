import React from "react";
import { View, Image, Text } from "react-native";
import {getUser, getApartmentPictures} from "../../backend/FlatSwapAPI"
import FlatSwapText from "./FlatSwapText";
import { getDistance } from "geolib";
type Properties = {
  id:number;
};


export default function ScrollListItem({id}: Properties) {
	const user = getUser(id);
	const green = Math.round(((user.trustscore - 100) / 900) * 255);
	const red = 255-green;
	const color = `rgb(${red}, ${green}, 0)`;
	const vienna = { latitude: 48.2082, longitude: 16.3738 };
	const london = { latitude: 51.5074, longitude: -0.1278 };
	const paris = { latitude: 48.8566, longitude: 2.3522 };
	const location = {latitude: user.latitude, longitude: user.longitude};
	let distance = 0;
	if (user.city=="Vienna"){
	distance = getDistance(vienna, location);
	}
	else if(user.city=="Paris"){
	distance = getDistance(paris, location);
	}
	else if(user.city=="London"){
	distance = getDistance(london, location);
	}
  return (	
		<View style={{flex:1, flexDirection: "column",justifyContent: "center", alignItems: "center", padding:10, borderRadius: 10, backgroundColor:"rgba(173, 216, 230, 0.7)"}}>
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
		
		<View style = {{alignItems: "left"}}>
		<FlatSwapText title={`Available: ${formatDate(user.startDate)} - ${formatDate(user.endDate)}`} />
		<FlatSwapText title={`${Math.round(distance/100)/10} km from city center`} />
		<FlatSwapText title={`${user.size} m²`} />
		<FlatSwapText title={`${user.beds} beds`} />
		</View>
		</View>
  );
}

function formatDate(date: string){

return `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(2,4)}`

}
