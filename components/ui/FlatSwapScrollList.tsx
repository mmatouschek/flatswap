import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import FlatSwapScrollViewItem from "./FlatSwapScrollViewItem";

type Props = {
  searchResult: any[];
};

export default function FlatSwapScrollList({ searchResult }: Props) {
  const navigation = useNavigation();
  if (searchResult.length < 1) {
    return <ScrollView style={{ flex: 1 }} />;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      {searchResult
        .sort((a: Item, b: Item) => {
          return b.trustscore - a.trustscore;
        })
        .map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DetailView", { id: item.id });
              }}
            >
              <View key={item.id} style={{ padding: 5 }}>
                <FlatSwapScrollViewItem id={item.id} />
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}
