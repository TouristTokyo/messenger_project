import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native-web';
import { useWindowDimensions } from 'react-native-web';

import SendSvg from '../../../assets/icons/sendSvg';

const MessageInput = ({ onSend, role, channelData }) => {
  const [message, setMessage] = useState('');
  const { width, height } = useWindowDimensions();

  const handleSend = () => {
    if (message && !role) {
      onSend(message);
      setMessage('');
    } else {
      onSend(message);
      setMessage('');
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
