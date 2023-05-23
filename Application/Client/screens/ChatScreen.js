import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native-web';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import SearchInput from '../components/inputs/searchInput/searchInput';
import HeaderButton from '../components/buttons/headerButton';
import DataInput from '../components/inputs/textInput/textInput';
import SearchBody from '../components/searchBodies/searchBody';
import ShowAvatar from '../components/Avatar/ShowAvatar/showAvatar';
import BorderButton from '../components/buttons/borderButton';
import ForwardMessage from '../components/forwardMessage/forwardMessage';
import MessageBody from '../components/messageBody/messageBody';
import MessageInput from '../components/inputs/messageInput/messageInput';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { setProfileNickname, getProfileNickname } from '../context/AsyncStorageUtil';

export default function ChatScreen({ navigation, route }) {
  const { chatUser } = route.params;
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState({
    nickname: '',
  });
  const { user, updateUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const { selectedImage } = useContext(ImageContext);
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const username = 'admin';
  const password = 'root';
  const [userText, setUserText] = useState('');
  const handleCreateChannel = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/channels/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify({
          username: userText,
          channelName: inputText.nickname,
        }),
      });

      if (response.ok) {
        const channelResponse = await response.json();
        setShowPopup(false);
        // Channel creation successful
        alert('Channel created');

        // Update user.channels in the AuthContext
        const updatedUser = {
          ...user,
          channels: [...user.channels, channelResponse],
        };

        // Store the updated user data in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Update user data in the AuthContext
        updateUser(updatedUser);
      } else {
        // Handle error response
        alert('Failed to create channel');
      }
    } catch (error) {
      alert('Error creating channel:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchProfileNickname();
      fetchChatData();
    }, [chatData])
  );
  const fetchChatData = async () => {
    try {
      const firstUser = user.name;
      const secondUser = chatUser.name;
      const url = `http://localhost:8080/api/chats/usernames?first_user=${firstUser}&second_user=${secondUser}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
  
      if (response.ok) {
        const chatData = await response.json();
      
        setChatData(chatData);
      } else {
        // Handle error response
        console.log('Failed to fetch chat data');
        console.log(chatUser);
      }
    } catch (error) {
      console.log('Error fetching chat data:', error);
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

  useEffect(() => {
    loadChatMessages();
  }, []);

  useEffect(() => {
    saveChatMessages();
  }, [messages]);


  const imageSource = selectedImage || (user && user.image);
  const isFormValid = inputText.nickname;
  const buttons = [
    {
      onPress: ({ }) => navigation.navigate('Profile'),
      text: 'Мой аккаунт',
    },
    {
      onPress: () => logout(),
      text: 'Выйти',
    },
  ];

  

  const saveChatMessages = async () => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error while saving chat messages:', error);
    }
  };

  const loadChatMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error while loading chat messages:', error);
    }
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.barContainer}>
                <SearchBody
                  data={{
                    avatarUrl: chatUser.image,
                    username: chatUser.name,
                  }}
                />
      </View>
      <View style={styles.profileContainer}>
        <ShowAvatar imageUrl={imageSource} profile={true} />
        <Text style={{ color: '#000000', fontSize: 48, textAlign: 'center', marginBottom: 13, fontFamily: 'Montserrat-Regular', }}>{userText ? userText : user.name}</Text>
        {buttons.map((data, index) => (
          <View style={{ width: '70%' }} key={index}>
            <BorderButton data={data} />
          </View>
        ))}
      </View>
      <View style={styles.historyContainer}>
        <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
        {chatData?.map((message) => {
                        return (
                            <MessageBody
                                key={message.id}
                                data={{
                                    imageUrl:  message.author?.image,
                                    nickname:  message.author?.name,
                                    message: message.data,
                                    date: message.date,
                                    own: message.author?.name === user.name,
                                    channel: false,
                                    unauth: false,
                                    ident: message.id
                                }}
                                currentUser={user}
                            />
                        );
                    })}
        </ScrollView>
      </View>
      <View style={styles.sendContainer}>
        <MessageInput channel = {false} curuser={userText ? userText : user.name} chanInf={chatUser.name} />
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
              placeholder={''}
              type={'nickname'}
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
