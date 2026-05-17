import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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

type ConversationsChatsProps = {
  chats: ChatItem[];
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>;
};

export default function ConversationsChats({ chats, setChats }: ConversationsChatsProps) {
  const navigation = useNavigation<any>();
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const getLastMessageText = (messages: ChatMessage[]) =>
    messages.length > 0 ? messages[messages.length - 1].text : '';

  const openProfile = (userId: number) => {
    navigation.navigate('DetailView', { id: userId });
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes}`;

      const newMessage: ChatMessage = {
        id: selectedChat.messages.length + 1,
        sender: 'me',
        text: messageInput,
        time,
      };

      const updatedSelected: ChatItem = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastMessage: getLastMessageText([...selectedChat.messages, newMessage]),
        timestamp: time,
      };

      setSelectedChat(updatedSelected);
      setChats((prev) =>
        [
          {
            ...updatedSelected,
            unread: 0,
          },
          ...prev.filter((c) => c.id !== updatedSelected.id),
        ]
      );

      setMessageInput('');
    }
  };

  const handleBack = () => {
    if (selectedChat) {
      setChats((prev) =>
        [
          {
            ...selectedChat,
            unread: 0,
          },
          ...prev.filter((c) => c.id !== selectedChat.id),
        ]
      );
    }
    setSelectedChat(null);
  };

  if (selectedChat) {
    return (
      <View style={styles.detailScreen}>
        <View style={styles.detailHeader}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <Pressable style={styles.detailHeaderTitleWrap} onPress={() => openProfile(selectedChat.userId)}>
            <Text style={styles.detailTitleLink}>{selectedChat.name}</Text>
            <Text style={styles.detailSubtitle}>FlatSwap chat</Text>
          </Pressable>
          <View style={styles.detailHeaderSpacer} />
        </View>

        <ScrollView style={styles.detailMessages} contentContainerStyle={styles.detailMessagesContent}>
          {selectedChat.messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageRow,
                message.sender === 'me' ? styles.messageRowMe : styles.messageRowOther,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.sender === 'me' ? styles.messageBubbleMe : styles.messageBubbleOther,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'me' ? styles.messageTextMe : styles.messageTextOther,
                  ]}
                >
                  {message.text}
                </Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={messageInput}
            onChangeText={setMessageInput}
            multiline
          />
          <Pressable style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {chats.map((chat) => (
        <Pressable
          key={chat.id}
          onPress={() => {
            setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)));
            setSelectedChat({ ...chat, unread: 0 });
          }}
          style={styles.chatItem}
        >
          <Pressable style={styles.avatar} onPress={() => openProfile(chat.userId)}>
            <Text style={styles.avatarText}>{chat.name[0]}</Text>
          </Pressable>

          <View style={styles.chatContent}>
            <Pressable onPress={() => openProfile(chat.userId)}>
              <Text style={styles.chatNameLink}>{chat.name}</Text>
            </Pressable>
            <Text numberOfLines={1} style={styles.chatMessage}>
              {getLastMessageText(chat.messages) || chat.lastMessage}
            </Text>
          </View>

          <View style={styles.chatRight}>
            <Text style={styles.timestamp}>{chat.timestamp}</Text>
            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unread}</Text>
              </View>
            )}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8fb',
    paddingTop: 10,
    paddingBottom: 12,
  },
  chatItem: {
    backgroundColor: 'rgba(173, 216, 230, 0.55)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(28, 163, 73, 0.08)',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailScreen: {
    flex: 1,
    backgroundColor: '#f3f8fb',
  },
  detailHeader: {
    backgroundColor: '#d8edf7',
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(28, 163, 73, 0.12)',
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    color: '#1ca349',
    fontWeight: '700',
    fontSize: 16,
  },
  detailHeaderTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  detailTitleLink: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1ca349',
    textDecorationLine: 'underline',
  },
  detailSubtitle: {
    fontSize: 12,
    color: '#54707f',
    marginTop: 2,
  },
  detailHeaderSpacer: {
    width: 48,
  },
  detailMessages: {
    flex: 1,
  },
  detailMessagesContent: {
    padding: 14,
    paddingBottom: 22,
  },
  messageRow: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '82%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },
  messageBubbleMe: {
    backgroundColor: 'rgba(28, 163, 73, 0.12)',
    borderColor: 'rgba(28, 163, 73, 0.2)',
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    borderColor: 'rgba(28, 163, 73, 0.08)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextMe: {
    color: '#0f1720',
  },
  messageTextOther: {
    color: '#0f1720',
  },
  messageTime: {
    fontSize: 11,
    color: '#54707f',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1ca349',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1ca349',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  avatarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  chatContent: {
    flex: 1,
    minWidth: 0,
  },
  chatNameLink: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1ca349',
    marginBottom: 4,
    textDecorationLine: 'underline',
  },
  chatMessage: {
    fontSize: 14,
    color: '#35505f',
  },
  chatRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: 2,
    paddingBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#54707f',
    marginBottom: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#1ca349',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f3f8fb',
    borderTopWidth: 1,
    borderTopColor: 'rgba(28, 163, 73, 0.08)',
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(173, 216, 230, 0.55)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f1720',
    borderWidth: 1,
    borderColor: 'rgba(28, 163, 73, 0.1)',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#1ca349',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});
