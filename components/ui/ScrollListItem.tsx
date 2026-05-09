import React from "react";
import { Image } from "react-native";
import { getImage } from "../app/chicago_api";
import { View, Text, StyleSheet, ScrollView, Pressable} from "react-native";

type Properties = {
  title:string;
  image:string;
  artist:string;
  goToDetail: ()=>void;
};


export default function ScrollListItem({title="test", image="none", artist="Yo", goToDetail}: Properties) {
	const graphics = getImage(image);
  return (	
		<View style={styles.background}>{graphics}
		<Text>{title}</Text>
		<Text>{artist}</Text>
		<Pressable style={styles.clicker} onPress={goToDetail}/>
		</View>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

	clicker:{
		...StyleSheet.absoluteFillObject,
		
	},
  background:{
    backgroundColor: "lightgray",
  },
  
   row: {
	padding:5,
	height:50,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
 
   text: {
	width:60,
	textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
});
