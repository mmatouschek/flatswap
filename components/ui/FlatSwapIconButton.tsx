import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { DefaultStyles } from "./DefaultStyles";

import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  icon: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size: number;
};

export default function FlatSwapIconButton({
  icon,
  onPress,
  style = DefaultStyles.button,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <Ionicons name={icon} size={25} style={{ color: "#fff" }} />
    </TouchableOpacity>
  );
}
