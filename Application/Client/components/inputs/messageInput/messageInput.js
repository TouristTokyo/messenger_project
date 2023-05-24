import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native-web';
import { useWindowDimensions } from 'react-native-web';
import useStyles from './messageInput.module';
import SendSvg from '../../../assets/icons/sendSvg';

const MessageInput = ({ curuser, chanInf, channel, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const { width, height } = useWindowDimensions();
  const styles = useStyles();
  const username = 'admin';
  const password = 'root';
  const handleSend = async () => {
    if (message) {
      try {
        if (channel) {
          // Use existing API endpoint for channel messages
          const requestBody = {
            currentUsername: curuser,
            message: message,
            channelName: chanInf.name,
          };
    
          const response = await fetch('https://messengerproject-production.up.railway.app/api/channels/add_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            console.log('Message sent successfully');
            setMessage('');
            onMessageSent(); // Invoke the callback to trigger chat data fetching
          } else {
            console.log('Failed to send message');
          }
        } else {
          // Use custom API endpoint for direct messages
          const requestBody = {
            currentUsername: curuser,
            otherUsername: chanInf,
            message: message,
          };
    
          const response = await fetch('https://messengerproject-production.up.railway.app/api/chats/add_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            console.log('Message sent successfully');
            setMessage('');
            onMessageSent(); // Invoke the callback to trigger chat data fetching
          } else {
            console.log('Failed to send message');
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <SendSvg />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
