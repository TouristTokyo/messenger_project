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
          const requestBody = {
            currentUsername: curuser,
            message: message,
            channelName: chanInf.channel.name,
          };
    
          const response = await fetch('http://localhost:8080/api/channels/add_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            setMessage('');
            onMessageSent(); 
          } else {
            alert('Не удалось отправить сообщение');
          }
        } else {
          // Use custom API endpoint for direct messages
          const requestBody = {
            currentUsername: curuser,
            otherUsername: chanInf,
            message: message,
          };
    
          const response = await fetch('http://localhost:8080/api/chats/add_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            setMessage('');
            onMessageSent();
          } else {
            alert('Не удалось отправить сообщение');
          }
        }
      } catch (error) {
        alert('Ошибка отправки:', error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Сообщение"
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
