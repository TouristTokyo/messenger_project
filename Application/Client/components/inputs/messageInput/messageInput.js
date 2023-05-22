import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native-web';
import { useWindowDimensions } from 'react-native-web';

import SendSvg from '../../../assets/icons/sendSvg';

const MessageInput = ({  curuser, chanInf }) => {
  const [message, setMessage] = useState('');
  const { width, height } = useWindowDimensions();
  const username = 'admin';
  const password = 'root';
  const handleSend = async () => {
    if (message) {
      const requestBody = {
        currentUsername: curuser,
        message: message,
        channelName: chanInf.name,
      };
  
      try {
        const response = await fetch('http://localhost:8080/api/channels/add_message', {
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
        } else {
          console.log('Failed to send message');
          console.log(message);
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingLeft: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 1)',
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-start',
    marginRight: 30
  },
  sendButton: {
    alignSelf: 'flex-end',
    marginLeft: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MessageInput;
