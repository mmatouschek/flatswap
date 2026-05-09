/*
usage:
<FlatSwapButton
		title=" "
		onPress={() => {}}
		style={} //defaults to FlatSwapStyle
		textStyle={} //defaults to FlatSwapStyle
/>
*/

import { DefaultStyles } from "./DefaultStyles";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function FlatSwapButton({
  title,
  onPress,
  style = DefaultStyles.button,
  textStyle DefaultStyles.buttonText,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}