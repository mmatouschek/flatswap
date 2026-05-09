/*
usage:
<FlatSwapInput
	value={text}
	onChangeText={setText}
	placeholder=""
	style={}
/>
*/

import { DefaultStyles } from "./DefaultStyles";
import React from "react";
import {
  TextInput,
  StyleProp,
  TextStyle,
} from "react-native";

type FlatSwapInputProps = {
  value: string;
  onChangeText: (text: string) => void;

  placeholder?: string;
  style?: StyleProp<TextStyle>;
};

export default function FlatSwapInput({
  value,
  onChangeText,
  placeholder = "...",
  style=DefaultStyles.input,
}: FlatSwapInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={style}
    />
  );
}a