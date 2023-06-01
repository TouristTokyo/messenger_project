import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView,  ActivityIndicator  } from 'react-native-web';
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
  const { user, storeCurrentScreen } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const { selectedImage } = useContext(ImageContext);
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const username = 'admin';
  const password = 'root';
  const [userText, setUserText] = useState('');


  const handleCreateChannel = async () => {
    try {
      const response = await fetch('https://backend-web-service-test.onrender.com/api/channels/create', {
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
        setShowPopup(false);
        alert('Канал создан');
        window.location.reload();
      } else {
        alert('Не удалось создать канал');
      }
    } catch (error) {
      alert('Ошибка при подключении к серверу:', error);
    }
  };
  const [shouldFetchChatData, setShouldFetchChatData] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setShouldFetchChatData(true);
    }, [])
  );
  
  useEffect(() => {
    if (shouldFetchChatData) {
      fetchChatData()
        .then(() => setShouldFetchChatData(false))
        .catch((error) =>  alert('Ошибка при подключении к серверу:', error))
    }
  }, [shouldFetchChatData]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShouldFetchChatData(true); 
    }, 1000);
  
    return () => clearInterval(intervalId); 
  }, []);
  
  const fetchChatData = async () => {
    const firstUser = user.name;
    const secondUser = chatUser.name;
    const url = `https://backend-web-service-test.onrender.com/api/chats/usernames?first_user=${firstUser}&second_user=${secondUser}`;
  
    try {
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
        console.log(chatData)
      } else {
        throw new Error('Ошибка при подгрузке чата, возможно его еще не существует');
      }
    } catch (error) {

    }
  };
  
  const handleMessageSent = () => {
    setShouldFetchChatData(true); 
  };
  
  const handleLogout = () => {
    logout();
    window.location.reload();
  }
 

  const fetchProfileNickname = async () => {
    try {
      const nickname = await getProfileNickname();
      if (nickname && nickname !== userText) {
        setUserText(nickname);
      }
    } catch (error) {
      console.log('Ошибка при подгрузке никнейма:', error);
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
      onPress: handleLogout,
      text: 'Выйти',
    },
  ];



  const saveChatMessages = async () => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Ошибка при сохранении сообщений чата:', error);
    }
  };

  const loadChatMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Ошибка при подгрузке сообщений чата:', error);
    }
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.barContainer}>
        <SearchBody
          data={{
            avatarUrl: chatUser.image,
            username: chatUser.name,
            onPress: fetchChatData
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
                  imageUrl: message.sender?.image,
                  nickname: message.sender.name,
                  message: message.data,
                  date: message.date,
                  own: message.sender?.name === user.name,
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
        <MessageInput channel={false} curuser={userText ? userText : user.name} chanInf={chatUser.name} onMessageSent={handleMessageSent}/>
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
            <TouchableHighlight onPress={() => setShowPopup(false)}>
            <HeaderButton title={"Создать"} onPress={handleCreateChannel} disabled={!isFormValid} />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}
