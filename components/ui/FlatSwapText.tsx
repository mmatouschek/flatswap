/*
usage:
	<FlatSwapText
		title=" "
		textStyle={} //defaults to FlatSwapStyle
	/>
*/

import { DefaultStyles } from "./DefaultStyles";
import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";

type FlatSwapTextProps = {
  title: string;
  style?: StyleProp<TextStyle>;
};

export default function FlatSwapText({
  title,
  style=DefaultStyles.text,
}: FlatSwapTextProps) {
  return <Text style={style}>{title}</Text>;
}