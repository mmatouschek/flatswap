import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type ChatMessage = {
  id: number;
  sender: 'me' | 'other';
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
  messages: ChatMessage[];
};

type ConversationsRequestsProps = {
  chats: ChatItem[];
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>;
};

export default function ConversationsRequests({ chats, setChats }: ConversationsRequestsProps) {
  const navigation = useNavigation<any>();
  const [requestStatuses, setRequestStatuses] = useState<{ [key: number]: string }>({
    1: 'accepted',
    2: 'pending',
    3: 'pending',
  });

  const mockRequests = [
    {
      id: 1,
      userId: 42,
      name: 'Mateo Silva',
      startDate: '2026-06-10',
      endDate: '2026-07-01',
      message: 'Hi! I would love to swap my Paris flat with yours in June.',
    },
    {
      id: 2,
      userId: 43,
      name: 'Yuki Tanaka',
      startDate: '2026-06-15',
      endDate: '2026-07-06',
      message: 'Hey! Interested in a summer swap? I have a beautiful flat in London.',
    },
    {
      id: 3,
      userId: 44,
      name: 'Amélie Dubois',
      startDate: '2026-06-20',
      endDate: '2026-07-11',
      message: 'Would love to do a month-long swap in Vienna!',
    },
  ];

  const getLastMessageText = (messages: ChatMessage[]) =>
    messages.length > 0 ? messages[messages.length - 1].text : '';

  const getStatusColor = (status: string) => {
    if (status === 'accepted') return '#1ca349';
    if (status === 'rejected') return '#ff6b6b';
    return '#999999';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'accepted') return 'Accepted';
    if (status === 'rejected') return 'Rejected';
    return 'Pending';
  };

  const handleAccept = (requestId: number) => {
    setRequestStatuses((prev) => ({
      ...prev,
      [requestId]: 'accepted',
    }));

    const request = mockRequests.find((r) => r.id === requestId);
    if (!request) return;

    const existing = chats.find((c) => c.userId === request.userId);
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    if (existing) {
      const updatedMessages = existing.messages;
      setChats((prev) =>
        [
          {
            ...existing,
            lastMessage: getLastMessageText(updatedMessages),
            timestamp: time,
            unread: 0,
          },
          ...prev.filter((c) => c.id !== existing.id),
        ]
      );
      return;
    }

    const newId = Math.max(0, ...chats.map((c) => c.id)) + 1;
    const newChat: ChatItem = {
      id: newId,
      userId: request.userId,
      name: request.name,
      lastMessage: request.message,
      timestamp: time,
      unread: 0,
      messages: [{ id: 1, sender: 'other', text: request.message, time }],
    };
    setChats((prev) => [newChat, ...prev]);
  };

  const handleDecline = (requestId: number) => {
    setRequestStatuses((prev) => ({
      ...prev,
      [requestId]: 'rejected',
    }));
  };

  const handleViewProfile = (userId: number) => {
    navigation.navigate('DetailView', { id: userId });
  };

  const currentStatus = (requestId: number) => requestStatuses[requestId] || 'pending';

  return (
    <ScrollView style={styles.container}>
      {mockRequests.map((request) => {
        const status = currentStatus(request.id);
        return (
          <View key={request.id} style={styles.requestItem}>
            <View style={styles.requestHeader}>
              <Pressable onPress={() => handleViewProfile(request.userId)}>
                <Text style={styles.requestNameLink}>{request.name}</Text>
              </Pressable>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
                <Text style={styles.statusText}>{getStatusLabel(status)}</Text>
              </View>
            </View>
            <Text style={styles.dateText}>
              {formatDate(request.startDate)} to {formatDate(request.endDate)}
            </Text>
            <Text numberOfLines={2} style={styles.messageText}>
              {request.message}
            </Text>

            {status === 'pending' && (
              <View style={styles.requestActions}>
                <Pressable style={styles.declineButton} onPress={() => handleDecline(request.id)}>
                  <Text style={styles.declineButtonText}>Decline</Text>
                </Pressable>
                <Pressable style={styles.acceptButton} onPress={() => handleAccept(request.id)}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

  function formatDate(date: string) {
    if (!date || date.length < 10) return date;
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8fb',
    paddingTop: 10,
    paddingBottom: 12,
  },
  requestItem: {
    backgroundColor: 'rgba(173, 216, 230, 0.45)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(28, 163, 73, 0.08)',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    flexDirection: 'column',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  requestNameLink: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1ca349',
    textDecorationLine: 'underline',
  },
  dateText: {
    fontSize: 12,
    color: '#555',
    marginVertical: 6,
  },
  messageText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#1ca349',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  declineButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderWidth: 1.5,
    borderColor: '#ff6b6b',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    color: '#ff6b6b',
    fontWeight: '700',
    fontSize: 14,
  },
});
