import { DefaultStyles } from "./DefaultStyles";
import React from "react";
import { Ionicons } from "@expo/vector-icons";


import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonProps = {
  icon: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function FlatSwapIconButton({
  icon,
  onPress,
  style = DefaultStyles.button,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
    >
      <Ionicons name={icon} />
    </TouchableOpacity>
  );
}