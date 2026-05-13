import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ListSearch from "./ListSearch";
import MapSearch from "./MapSearch";
import Placeholder from "./placeholder";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      animation="fade"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Search") {
            iconName = "magnifying-glass";
          } else if (route.name === "MapSearch") {
            iconName = "map";
          } else if (route.name === "Your Trip") {
            iconName = "suitcase";
          } else if (route.name === "Your Conversations") {
            iconName = "comment-dots";
          } else if (route.name === "Profile") {
            iconName = "circle-user";
          }
          return (
            <FontAwesomeFreeSolid name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#1ca349",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 90,
        },
        tabBarItemStyle: {
          borderRightWidth: 1,
          borderRightColor: "#e0e0e0", // A light grey line
          height: "80%", // Make the line shorter than the bar for a cleaner look
          marginTop: 15, // Vertically center the shorter line
        },
      })}
    >
      <Tab.Screen name="MapSearch" component={MapSearch} />
      <Tab.Screen name="Search" component={ListSearch} />
      <Tab.Screen name="Your Trip" component={Placeholder} />
      <Tab.Screen name="Your Conversations" component={Placeholder} />
      <Tab.Screen name="Profile" component={Placeholder} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIconStyle: {
    backgroundColor: "gray",
  },
});
