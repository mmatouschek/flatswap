import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ConversationsChats from './ConversationsChats';
import ConversationsRequests from './ConversationsRequests';

type ChatMessage = {
	id: number;
	sender: 'me' | 'other';
	text: string;
	time: string;
};

type ChatItem = {
	id: number;
	name: string;
	lastMessage: string;
	timestamp: string;
	unread: number;
	messages: ChatMessage[];
};

const TopTab = createMaterialTopTabNavigator();

export default function Conversations() {
	const [chats, setChats] = useState<ChatItem[]>([
		{
			id: 1,
			name: 'Emma Mueller',
			lastMessage: 'See you then!',
			timestamp: '09:12',
			unread: 0,
			messages: [
				{ id: 1, sender: 'other', text: 'Hi! Are we set for June?', time: '09:00' },
				{ id: 2, sender: 'me', text: "Yes — looking forward to it.", time: '09:12' },
			],
		},
		{
			id: 2,
			name: 'Marco Rossi',
			lastMessage: 'I can send photos later',
			timestamp: '08:05',
			unread: 2,
			messages: [
				{ id: 1, sender: 'other', text: 'Interested in a summer swap?', time: '07:55' },
			],
		},
	]);

	return (
		<TopTab.Navigator
			initialRouteName="Chats"
			screenOptions={{
				tabBarActiveTintColor: '#1ca349',
				tabBarIndicatorStyle: { backgroundColor: '#1ca349' },
			}}
		>
			<TopTab.Screen name="Chats">
				{() => <ConversationsChats chats={chats} setChats={setChats} />}
			</TopTab.Screen>
			<TopTab.Screen name="Requests">
				{() => <ConversationsRequests chats={chats} setChats={setChats} />}
			</TopTab.Screen>
		</TopTab.Navigator>
	);
}

const styles = StyleSheet.create({});
