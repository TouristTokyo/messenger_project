import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, TouchableHighlight } from 'react-native-web';
import ShowAvatar from '../Avatar/ShowAvatar/showAvatar';
import useStyles from './forwardMessage.module';
import AuthContext from '../../context/AuthContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ForwardMessage = ({ data }) => {
  const { imageUrl, nickname, message, own, from, id, nav, answer } = data;
  const styles = useStyles();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { user } = useContext(AuthContext);
  const username = 'admin';
  const password = 'root';
  const [isHovered, setIsHovered] = useState(false);
  const { width, height } = useWindowDimensions();
  const navigationt = useNavigation();
  const handleDeletePress = () => {
    const user_id = user.id;
    const message_id = id;
    setShowDeleteButton(false);
    fetch(`https://linking-api.onrender.com/api/saved_message/delete?user_id=${user_id}&message_id=${message_id}`, {
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
        alert('Ошибка при удалении сообщения', error);
      });
  };

  const handleMessageBoxPress = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleNavigation = () => {
    if (answer) {
      navigationt.navigate('Chat', { chatUser: nav });
    } else {
      navigationt.navigate('Channel', { channelId: nav });
    }
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
        <TouchableHighlight onPress={handleNavigation}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <Text style={{
            fontFamily: 'Montserrat-Italic',
            fontSize: Math.min(width * 0.008, height * 0.025),
            color: isHovered ? 'white' : 'black',
          }}>
            Forwarded from: {from}
          </Text>
        </TouchableHighlight >
        {!own && <View style={styles.bubbleTail} />}
      </TouchableOpacity>
    </View>
  );
};

export default ForwardMessage;