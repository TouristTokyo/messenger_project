import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
import ShowAvatar from '../Avatar/ShowAvatar/showAvatar';
import ForwardSvg from '../../assets/icons/forwardSvg';
import ForwardFocusSvg from '../../assets/icons/forwardFocusSvg';
import { MessageContext } from '../../context/MessageContext';
import AuthContext from '../../context/AuthContext';
import useStyles from './messageBody.module';

const MessageBody = ({ data, currentUser }) => {
  const { imageUrl, nickname, role, message, own, channel, date, unauth, ident  } = data;
  const [isFocused, setIsFocused] = useState(false);
  const dated = new Date(date);
  const time = dated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const username = 'admin';
  const password = 'root';
  const {user} = useContext(AuthContext);
  const styles = useStyles();
  const { addForwardedMessage } = useContext(MessageContext);

  const handleForwardPress = async () => {
    setIsFocused(prevState => !prevState);
    const body = {
      username: user.name,
      messageId: ident
    };

    try {
      const response = await fetch('https://messengerproject-production.up.railway.app/api/saved_message/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Forwarding successful
        console.log('Message forwarded successfully');
      } else {
        // Forwarding failed
        console.log('Failed to forward message');
      }
    } catch (error) {
      console.log('Error forwarding message:', error);
    }
  };

  const forwardIcon = isFocused ? <ForwardFocusSvg /> : <ForwardSvg />;

  const messageBoxStyles = [
    styles.messageBox,
    own ? styles.ownMessageBox : styles.box,
    {
      borderTopRightRadius: own ? 10 : 10,
      borderBottomRightRadius: own ? 0 : 10,
      borderBottomLeftRadius: own ? 10 : 0,
    },
  ];

  return (
    <View style={own ? styles.ownContainer : styles.container}>
      {!own && imageUrl && (
        <View style={styles.avatar}>
          <ShowAvatar imageUrl={imageUrl} profile={false} />
        </View>
      )}
      <View style={messageBoxStyles}>
        {!unauth && (
          <TouchableOpacity onPress={handleForwardPress}>
            <View style={own ? styles.ownForward : styles.forward}>{forwardIcon}</View>
          </TouchableOpacity>
        )}
        <Text style={styles.nickname}>{nickname}</Text>
        {channel && <Text style={styles.role}>{role}</Text>}
        <Text style={styles.message}>{message}</Text>
        <Text style={own ? styles.ownTime : styles.time}>{time}</Text>
      </View>
    </View>
  );
};



export default MessageBody;
