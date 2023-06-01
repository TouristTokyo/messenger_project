import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native-web';
import ShowAvatar from '../Avatar/ShowAvatar/showAvatar';
import useStyles from './forwardMessage.module';
import AuthContext from '../../context/AuthContext';

const ForwardMessage = ({ data }) => {
  const { imageUrl, nickname, message, own, from, id } = data;
  const styles = useStyles();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const {user} = useContext(AuthContext);
  const username = 'admin';
  const password = 'root';
  const { width, height } = useWindowDimensions();
  const handleDeletePress = () => {
    const user_id = user.id; 
    const message_id = id; 

    fetch(`https://backend-web-service-test.onrender.com/api/saved_message/delete?user_id=${user_id}&message_id=${message_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert('Не удалось удалить сообщение');
        }
      })
      .catch((error) => {
        alert('Ошибка при удалении сообщения:', error);
      });
  };

  const handleMessageBoxPress = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  return (
    <View style={styles.container}>
      {own ? null : (
        <ShowAvatar imageUrl={imageUrl} profile={false} style={styles.avatar} />
      )}
      <TouchableOpacity
        style={[
          styles.messageBox,
          own && styles.ownMessageBox,
        ]}
        onPress={handleMessageBoxPress}
      >
        {showDeleteButton && (
          <TouchableOpacity onPress={handleDeletePress}>
            <Text style={{ fontFamily: 'Montserrat-Italic' }}>Удалить</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.nickname, own && styles.ownNickname]}>
          {nickname}
        </Text>
        <Text style={[styles.message, own && styles.ownMessage]}>{message}</Text>
        <Text style={{ fontFamily: 'Montserrat-Italic', fontSize: Math.min(width * 0.008, height * 0.025), }}>
          Forwarded from: {from}
        </Text>
        {!own && <View style={styles.bubbleTail} />}
      </TouchableOpacity>
    </View>
  );
};

export default ForwardMessage;