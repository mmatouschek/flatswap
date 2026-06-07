import { isUserLoggedIn } from "@/backend/services/AuthStorage";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConversationsChats from "./ConversationsChats";
import ConversationsRequests from "./ConversationsRequests";

type ChatMessage = {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
};

type ChatItem = {
  id: number;
  userId: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  reviewed: boolean;
  messages: ChatMessage[];
};

const TopTab = createMaterialTopTabNavigator();

export default function Conversations() {
  const navigation = useNavigation<any>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [chats, setChats] = useState<ChatItem[]>([
    {
      id: 1,
      userId: 21,
      name: "Emma Fischer",
      lastMessage: "See you then!",
      timestamp: "09:12",
      unread: 0,
      reviewed: false,
      messages: [
        {
          id: 1,
          sender: "other",
          text: "Hi! Are we set for June?",
          time: "09:00",
        },
        {
          id: 2,
          sender: "me",
          text: "Yes, looking forward to it.",
          time: "09:12",
        },
      ],
    },
    {
      id: 2,
      userId: 41,
      name: "Aisha Khan",
      lastMessage: "I can send photos later",
      timestamp: "08:05",
      unread: 1,
      reviewed: false,
      messages: [
        {
          id: 1,
          sender: "other",
          text: "Interested in a summer swap?",
          time: "07:55",
        },
      ],
    },
    {
      id: 3,
      userId: 24,
      name: "Sophie Klein",
      lastMessage: "I can send photos later",
      timestamp: "Yesterday",
      unread: 1,
      reviewed: false,
      messages: [
        {
          id: 1,
          sender: "other",
          text: "Would love to chat about a swap.",
          time: "18:40",
        },
      ],
    },
  ]);
  const checkLogin = async () => {
    const result = await isUserLoggedIn();

    setLoggedIn(result);
  };
  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      {loggedIn ? (
        <TopTab.Navigator
          initialRouteName="Chats"
          screenOptions={{
            tabBarActiveTintColor: "#1ca349",
            tabBarIndicatorStyle: { backgroundColor: "#1ca349" },
          }}
        >
          <TopTab.Screen name="Chats">
            {() => <ConversationsChats chats={chats} setChats={setChats} />}
          </TopTab.Screen>
          <TopTab.Screen name="Requests">
            {() => <ConversationsRequests chats={chats} setChats={setChats} />}
          </TopTab.Screen>
        </TopTab.Navigator>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center", // Centers content vertically
            alignItems: "center", // Centers content horizontally
            padding: 32, // Keeps text from touching the screen edges on smaller devices
          }}
        >
          <Ionicons
            name="log-in-outline"
            size={30}
            color="#9ca3af"
            style={{ marginBottom: 2 }}
          />
          <Text
            style={{
              color: "#6b7280", // A softer, slate-gray color is much easier on the eyes
              textAlign: "center", // Ensures the multiline text is centered within itself
              fontSize: 18,
            }}
          >
            Login to view your conversations and requests.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              navigation.navigate("Profile");
              return;
            }}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: "50%",
    backgroundColor: "#1ca349",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
