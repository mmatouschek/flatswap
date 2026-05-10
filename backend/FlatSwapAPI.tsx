import entries from "./backend.json";
import React from "react";
import { Image } from "react-native";

export default function getAllUsers() {
  return entries.entries;
  }
  
  
export function getUser(id: number){
let result = null;
entries.entries.forEach((item) => {
  if (item.id==id){
	result = item;
  }
});
return result;
}


export function getResults(city: string){
let result = [];
entries.entries.forEach((item) => {
  if (item.city.startsWith(city)){
	result.push(item);
  }
});
return result;
}

export function getApartmentPictures(id: number){
const pic = [
  [require("./1/1.jpg"), require("./1/2.jpg")],
  [require("./2/1.jpg"), require("./2/2.jpg")],
  [require("./3/1.jpg"), require("./3/2.jpg")],
  [require("./4/1.jpg"), require("./4/2.jpg")],
  [require("./5/1.jpg"), require("./5/2.jpg")],
  [require("./6/1.jpg"), require("./6/2.jpg")],
  [require("./7/1.jpg"), require("./7/2.jpg")],
  [require("./8/1.jpg"), require("./8/2.jpg")],
  [require("./9/1.jpg"), require("./9/2.jpg")],
  [require("./10/1.jpg"), require("./10/2.jpg")],
  [require("./11/1.jpg"), require("./11/2.jpg")],
  [require("./12/1.jpg"), require("./12/2.jpg")],
  [require("./13/1.jpg"), require("./13/2.jpg")],
  [require("./14/1.jpg"), require("./14/2.jpg")],
  [require("./15/1.jpg"), require("./15/2.jpg")],
  [require("./16/1.jpg"), require("./16/2.jpg")],
  [require("./17/1.jpg"), require("./17/2.jpg")],
  [require("./18/1.jpg"), require("./18/2.jpg")],
  [require("./19/1.jpg"), require("./19/2.jpg")],
  [require("./20/1.jpg"), require("./20/2.jpg")],
];
return(
[<Image source={pic[id-1][0]}
  style={{ width: "100%", height: 300  }}
  resizeMode="contain"/>,
  <Image source={pic[id-1][1]}
  style={{ width: "100%", height: 300 }}
  resizeMode="contain"/>])


}
