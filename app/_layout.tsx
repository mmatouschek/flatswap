import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import AddApartmentScreen from "./apartments/add_apartment1";
import AddApartment2Screen from "./apartments/add_apartment2";
import PreferencesScreen from "./apartments/search_preferences";
import SelectLocationScreen from "./apartments/select_location";
import TripsScreen from "./apartments/tripsScreen";
import LoginScreen from "./auth/login";
import ProfileScreen from "./auth/profile";
import CreateAccountScreen from "./auth/register";
import DetailView from "./DetailView";
import Placeholder from "./placeholder";
import SearchTabs from "./SearchTabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      //animation="fade"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Search") {
            iconName = "magnifying-glass";
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
          borderRightColor: "#e0e0e0",
          height: "80%",
          marginTop: 15,
        },
      })}
    >
      <Tab.Screen name="Search" component={SearchTabs} />
      <Tab.Screen name="Your Trip" component={TripsScreen} />
      <Tab.Screen name="Your Conversations" component={Placeholder} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

      <Tab.Screen
        name="AddApartment"
        component={AddApartmentScreen} // hidden Button
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="AddApartment2"
        component={AddApartment2Screen} // hidden Button
        options={{
          tabBarButton: () => null,

          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{
          tabBarButton: () => null,

          tabBarItemStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="SelectLocation"
        component={SelectLocationScreen}
        options={{
          tabBarButton: () => null,

          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DetailView" component={DetailView} />
      {/* Routen  */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIconStyle: {
    backgroundColor: "gray",
  },
});
