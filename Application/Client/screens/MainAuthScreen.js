import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView, Image, Platform } from 'react-native-web';
import { useFocusEffect } from '@react-navigation/native';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import SearchInput from '../components/inputs/searchInput/searchInput';
import HeaderButton from '../components/buttons/headerButton';
import DataInput from '../components/inputs/textInput/textInput';
import SearchBody from '../components/searchBodies/searchBody';
import ShowAvatar from '../components/Avatar/ShowAvatar/showAvatar';
import BorderButton from '../components/buttons/borderButton';
import ForwardMessage from '../components/forwardMessage/forwardMessage';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import DeleteSvg from '../assets/icons/deleteSvg';
import { setProfileNickname, getProfileNickname } from '../context/AsyncStorageUtil';



export default function MainAuthScreen({ navigation }) {
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState({
    nickname: '',
  });
  const { user, updateUser, logout } = useContext(AuthContext);
  const [userText, setUserText] = useState('');
  const username = 'admin';
  const password = 'root';
  const updateUserCallback = useCallback(updatedUser => updateUser(updatedUser), [updateUser]);
  const { selectedImage } = useContext(ImageContext);
  const { forwardedMessages, clearForwardedMessages } = useContext(MessageContext);


  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      fetchProfileNickname();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        
        updateUserCallback(userData);
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchProfileNickname = async () => {
    try {
      const nickname = await getProfileNickname();
      if (nickname && nickname !== userText) {
        setUserText(nickname);
      }
    } catch (error) {
      console.log('Error retrieving profile nickname:', error);
    }
  };
  const handleClearForwardedMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/saved_message/delete_all?user_id=${user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
  
      if (response.ok) {
        console.log(`Messages deleted successfully`);
        window.location.reload();
      } else {
        console.log(`Failed to delete messages`);

      }
    } catch (error) {
      console.log('Error deleting messages:', error);
    }
  };
  

  const isFormValid = inputText.nickname;
  const buttons = [
    {
      onPress: ({ }) => navigation.navigate('Profile'),
      text: 'Мой аккаунт'
    },
    {
      onPress: () => logout(),
      text: 'Выйти'
    }
  ];

  const handleCreateChannel = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/channels/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify({
          username: user.name,
          channelName: inputText.nickname,
        }),
      });

      if (response.ok) {
        const channelResponse = await response.json();
        setShowPopup(false);
        // Channel creation successful
        alert('Channel created');
        window.location.reload();
      } else {
        // Handle error response
        alert('Failed to create channel');
      }
    } catch (error) {
      alert('Error creating channel:', error);
    }
  };



  const imageSource = user.image;



  return (
    <View style={styles.containerMain}>
      <View style={styles.messageContainer}>
        <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
          {user.channels.map((channel) => (
            <SearchBody
              key={channel.id}
              data={{
                username: channel.name,
                onPress: () => navigation.navigate('Channel', { channelId: channel.id }),
              }}
            />
          ))}
          {user.chats.map((chat) => {
            if (chat.userSecond.name === user.name) {
              return (
                <SearchBody
                  key={chat.id}
                  data={{
                    avatarUrl: chat.userFirst.image,
                    username: chat.userFirst.name,
                    onPress: () => navigation.navigate('Chat', { chatUser: chat.userFirst }),
                  }}
                />
              );
            } else {
              return (
                <SearchBody
                  key={chat.id}
                  data={{
                    avatarUrl: chat.userSecond.image,
                    username: chat.userSecond.name,
                    onPress: () => navigation.navigate('Chat', { chatUser: chat.userSecond }),
                  }}
                />
              );
            }
          })}
        </ScrollView>
      </View>
      <View style={styles.profileContainer}>
        <ShowAvatar imageUrl={selectedImage} profile={true} />
        <Text style={{
          color: '#000000',
          fontSize: 48,
          textAlign: 'center',
          marginBottom: 13,
          fontFamily: 'Montserrat-Regular',
        }}>{userText ? userText : user.name}</Text>
        {buttons.map((data, index) => (
          <View style={{ width: '70%' }} key={index}>
            <BorderButton data={data} />
          </View>
        ))}
      </View>
      <View style={styles.forwardContainer}>
        {user?.savedMessages?.length > 0 && (
          <View style={{ right: 50, position: 'absolute', zIndex: 1 }}>
            <TouchableHighlight onPress={handleClearForwardedMessages}>
              <DeleteSvg />
            </TouchableHighlight>
          </View>
        )}
        <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>

          {user?.savedMessages?.map((message) => {
            return (
              <View style={{ marginBottom: 13 }}>
                <ForwardMessage
                  key={message.id}
                  data={{
                    imageUrl: message.sender?.image,
                    nickname: message.sender?.name,

                    message: message.data,

                    own: message.sender?.name === user.name,


                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.bottomLeft}>
        <TouchableHighlight onPress={() => setShowPopup(true)}>
          <CreateSvg />
        </TouchableHighlight>
      </View>
      <Modal visible={showPopup} transparent={true}>
        <View style={styles.popupContainer}>
          <Text style={styles.text}>Название канала</Text>
          <View style={{ marginBottom: 13, alignItems: 'center' }}>
            <DataInput
              value={inputText.nickname}
              setValue={(text) => setInputText({ ...inputText, nickname: text })}
              placeholder={""}
              type={"nickname"}
              flex={true}
            />
          </View>
          <View>
            <HeaderButton title={"Создать"} onPress={handleCreateChannel} disabled={!isFormValid} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
