import React, { useState } from "react";
import { View } from "react-native";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import FlatSwapButton from "../components/ui/FlatSwapButton";
import ListSearch from "./ListSearch";
import MapSearch from "./MapSearch";

export default function SearchTabs() {
  const [page, setPage] = useState(false);

  if (page) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 5,
            margin: 5,
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <FlatSwapButton
            style={[
              DefaultStyles.button,
              {
                flex: 1,
                height: 50,
                marginRight: 3,
                backgroundColor: "rgba(173, 216, 230,0.3)",
              },
            ]}
            title="List"
            onPress={() => {
              setPage(false);
            }}
          />
          <FlatSwapButton
            style={[
              DefaultStyles.button,
              {
                flex: 1,
                height: 50,
                backgroundColor: "#1ca349",
                marginLeft: 3,
              },
            ]}
            title="Map"
            onPress={() => {
              setPage(true);
            }}
          />
        </View>
        <View style={{ flex: 17 }}>
          <MapSearch />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 5,
            margin: 5,
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <FlatSwapButton
            style={[
              DefaultStyles.button,
              {
                flex: 1,
                height: 50,
                backgroundColor: "#1ca349",
                marginRight: 3,
              },
            ]}
            title="List"
            onPress={() => {
              setPage(false);
            }}
          />
          <FlatSwapButton
            style={[
              DefaultStyles.button,
              {
                flex: 1,
                height: 50,
                backgroundColor: "rgba(173, 216, 230,0.3)",
                marginLeft: 3,
              },
            ]}
            title="Map"
            onPress={() => {
              setPage(true);
            }}
          />
        </View>
        <View style={{ flex: 17 }}>
          <ListSearch />
        </View>
      </View>
    );
  }
}
