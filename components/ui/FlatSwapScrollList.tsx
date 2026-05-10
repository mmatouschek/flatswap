import { View, Text, StyleSheet, ScrollView} from "react-native";
import FlatSwapButton from "./ui/FlatSwapButton";
import FlatSwapText from "./FlatSwapText";
import FlatSwapScrollViewItem from "./FlatSwapScrollViewItem";
import { DefaultStyles } from "./DefaultStyles";
import React, { useState } from "react";
import { useRouter, Slot, Redirect  } from "expo-router";
import MapView, { Marker, Circle } from "react-native-maps";


export default function FlatSwapScrollList() {

return(
<View>

<FlatSwapScrollViewItem id={9} />

</View>
);
}