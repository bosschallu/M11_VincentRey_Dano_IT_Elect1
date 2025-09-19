import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App() {
  // Chat State
  const [messages, setMessages] = useState([
    { id: '1', text: 'Goodmorning love', sender: 'other' },
    { id: '2', text: 'Goodmorning too love', sender: 'me' },
    { id: '1', text: 'Kumusta school love', sender: 'other' },
    { id: '2', text: 'Ok ra love bagsakonon hahaha', sender: 'me' },
  ]);
  const [input, setInput] = useState('');

  // Comments State
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Send Chat Message
  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  // Add Comment
  const addComment = () => {
    if (newComment.trim() === '') return;

    const comment = {
      id: Date.now().toString(),
      text: newComment,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  // Render Chat Message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  // Render Comment
  const renderComment = ({ item }) => (
    <View style={styles.commentBubble}>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Chat Section */}
        <Text style={styles.sectionTitle}>Chat</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.flatList}
          scrollEnabled={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Chat diri ba"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Comment Section */}
        <Text style={styles.sectionTitle}>Comment Lang</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          style={styles.flatList}
          scrollEnabled={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Comment Diri sir"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.sendButton} onPress={addComment}>
            <Text style={styles.sendText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'Pink',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  flatList: {
    flexGrow: 0,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: 'Red',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentBubble: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
});