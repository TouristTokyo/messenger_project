import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import ShowAvatar from '../Avatar/ShowAvatar/showAvatar';
import useStyles from './forwardMessage.module';

const ForwardMessage = ({ data }) => {
  const {imageUrl, nickname, message, own, from } = data
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {own ? null : (
        <ShowAvatar imageUrl={imageUrl} profile={false} style={styles.avatar} />
      )}
      <View
        style={[
          styles.messageBox,
          own && styles.ownMessageBox,
        ]}
      >
        <Text style={[styles.nickname, own && styles.ownNickname]}>
          {nickname}
        </Text>
        <Text style={[styles.message, own && styles.ownMessage]}>{message}</Text>
        <Text style = {{ fontFamily: 'Montserrat-Italic', }}>Forwarded from: {from}</Text>
      </View>
    </View>
  );
};


export default ForwardMessage;
