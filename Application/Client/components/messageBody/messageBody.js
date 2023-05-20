import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
import ShowAvatar from '../Avatar/ShowAvatar/showAvatar';
import ForwardSvg from '../../assets/icons/forwardSvg';
import ForwardFocusSvg from '../../assets/icons/forwardFocusSvg';
import { MessageContext } from '../../context/MessageContext';

const MessageBody = ({ data }) => {
  const { imageUrl, nickname, role, message, own, channel } = data;
  const [isFocused, setIsFocused] = useState(false);
  const date = new Date();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

 
  if (!data) {
    return null; // Add a null check to handle undefined data object
  }

  const { addForwardedMessage } = useContext(MessageContext);

  const handleForwardPress = () => {
    setIsFocused(prevState => !prevState);
    addForwardedMessage({
      imageUrl,
      nickname,
      role,
      message,
      own,
      channel
    });
  };

  const forwardIcon = isFocused ? <ForwardFocusSvg /> : <ForwardSvg />;

  return (
    <View style={own ? styles.ownContainer : styles.container}>
      {!own && imageUrl && (
        <View style={styles.avatar}>
          <ShowAvatar imageUrl={imageUrl} profile={false} />
        </View>
      )}
      <View
        style={[
          styles.messageBox,
          own ? styles.ownMessageBox : styles.box,
          {
            borderTopRightRadius: own ? 10 : 10,
            borderBottomRightRadius: own ? 0 : 10,
            borderBottomLeftRadius: own ? 10 : 0,
          },
        ]}
      >
        <TouchableOpacity onPress={handleForwardPress}>
          <View style={own ? styles.ownForward : styles.forward}>{forwardIcon}</View>
        </TouchableOpacity>
        <Text style={styles.nickname}>{nickname}</Text>
        {channel && <Text style={styles.role}>{role}</Text>}
        <Text style={styles.message}>{message}</Text>
        <Text style={own ? styles.ownTime : styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    maxWidth: '100%',
  },
  ownContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginBottom: 10,
    maxWidth: '100%',
  },
  avatar: {
    alignSelf: 'flex-start',
    marginBottom: 0, // Remove marginBottom: 'auto'
  },
  messageBox: {
    backgroundColor: '#E7DEDE',
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: '60%',
    marginBottom: 0, // Remove marginBottom: 13
  },
  box: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  ownMessageBox: {
    backgroundColor: 'rgba(0, 118, 185, 0.35)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: '60%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 0, // Remove marginBottom: 13
  },
  forward: {
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  ownForward: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  nickname: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  role: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
    color: '#0076B9',
    marginBottom: 5,
  },
  message: {
    fontSize: 19,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    alignSelf: 'flex-end',
  },
  ownTime: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    alignSelf: 'flex-start',
  },
});

export default MessageBody;
