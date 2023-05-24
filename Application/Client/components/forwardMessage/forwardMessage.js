import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
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
  const handleDeletePress = () => {
   
    const user_id = user.id; 
    const message_id = id; 

    fetch(`https://messengerproject-production.up.railway.app/api/saved_message/delete?user_id=${user_id}&message_id=${message_id}`, {
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
          // Delete request failed, handle accordingly
          console.log('Failed to delete message');
        }
      })
      .catch((error) => {
        console.log('Error deleting message:', error);
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
          <TouchableOpacity  onPress={handleDeletePress}>
            <Text style={{ fontFamily: 'Montserrat-Italic' }}>Удалить</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.nickname, own && styles.ownNickname]}>
          {nickname}
        </Text>
        <Text style={[styles.message, own && styles.ownMessage]}>{message}</Text>
        <Text style={{ fontFamily: 'Montserrat-Italic' }}>
          Forwarded from: {from}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForwardMessage;
