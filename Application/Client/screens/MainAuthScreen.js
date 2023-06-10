import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableHighlight, Modal, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native-web';
import { useFocusEffect } from '@react-navigation/native';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import HeaderButton from '../components/buttons/headerButton';
import DataInput from '../components/inputs/textInput/textInput';
import SearchBody from '../components/searchBodies/searchBody';
import ShowAvatar from '../components/Avatar/ShowAvatar/showAvatar';
import BorderButton from '../components/buttons/borderButton';
import ForwardMessage from '../components/forwardMessage/forwardMessage';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';
import DeleteSvg from '../assets/icons/deleteSvg';
import { getProfileNickname } from '../context/AsyncStorageUtil';



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
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      fetchProfileNickname();
     
    }, [])
  );

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://linking-api.onrender.com/api/users/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        updateUserCallback(userData);
        setIsLoading(false);
        console.log(user?.savedMessages);
      } else {
        console.log('Не удалось подгрузить данные пользователя');
      }
    } catch (error) {
      alert('Ошибка при подключении к серверу', error);
    }
  };
  const fetchProfileNickname = async () => {
    try {
      const nickname = await getProfileNickname();
      if (nickname && nickname !== userText) {
        setUserText(nickname);
      }
    } catch (error) {
    }
  };
  const handleClearForwardedMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://linking-api.onrender.com/api/saved_message/delete_all?user_id=${user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        console.log(`Сообщения успешно удалены!`);
        window.location.reload();
      } else {
        console.log(`Не удалось удалить сообщения!`);

      }
    } catch (error) {
      alert('Ошибка при подключении к серверу', error);
    }
  };


  const isFormValid = inputText.nickname;
  const buttons = [
    {
      onPress: ({ }) => navigation.navigate('Profile'),
      text: 'Мой аккаунт'
    },
    {
      onPress: handleLogout,
      text: 'Выйти'
    }
  ];

  const handleCreateChannel = async () => {
    try {
      const response = await fetch('https://linking-api.onrender.com/api/channels/create', {
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
      alert('Ошибка при подключении к серверу', error);
    }
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.messageContainer}>

        <View style={styles.containerTop}>
          <Text style={styles.headerText}>Ваши чаты</Text>
        </View>
        {isLoading && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color='rgba(0, 118, 185, 0.35)' />
          </View>
        )}

        {!isLoading && (
          <>
            {user.chats.length > 0 ? (
              <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                {user.chats.map((chat) => {
                  if (chat.recipient.name === user.name) {
                    return (
                      <SearchBody
                        key={chat.id}
                        data={{
                          avatarUrl: chat.sender.image,
                          username: chat.sender.name,
                          onPress: () => navigation.navigate('Chat', { chatUser: chat.sender }),
                          main: true,
                          id: chat.id
                        }}
                      />
                    );
                  } else {
                    return (
                      <SearchBody
                        key={chat.id}
                        data={{
                          avatarUrl: chat.recipient.image,
                          username: chat.recipient.name,
                          onPress: () => navigation.navigate('Chat', { chatUser: chat.recipient }),
                          main: true,
                          id: chat.id
                        }}
                      />
                    );
                  }
                })}
              </ScrollView>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMessageText}>У вас нет чатов</Text>
              </View>
            )}
          </>
        )}



        <View style={styles.containerBottom}>
          <Text style={styles.headerText}>Ваши каналы</Text>
        </View>
        {isLoading && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color='rgba(0, 118, 185, 0.35)' />
          </View>
        )}
        {!isLoading && (
          <>
            {user.channels.length > 0 ? (
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
              </ScrollView>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMessageText}>Вы не состоите в каких-либо каналах</Text>
              </View>
            )}
          </>
        )}

      </View>
      <View style={styles.profileContainer}>
        <ShowAvatar imageUrl={selectedImage} profile={true} />
        <Text style={{
          color: '#000000',
          fontSize: Math.min(width * 0.03, height * 0.055),
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
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Сохранённые сообщения</Text>

          {user?.savedMessages?.length > 0 && !isLoading && (
            <TouchableHighlight onPress={handleClearForwardedMessages}>
              <DeleteSvg />
            </TouchableHighlight>
          )}
        </View>
        {isLoading && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color='rgba(0, 118, 185, 0.35)' />
          </View>
        )}
        {!isLoading && (
          <>
            {user?.savedMessages?.length > 0 ? (
              <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                {user.savedMessages.map((message) => {
                  return (
                    <View style={{ marginBottom: 13 }}>
                      <ForwardMessage
                        key={message.id}
                        data={{
                          imageUrl: message.sender?.image,
                          nickname: message.sender?.name,
                          message: message.data,
                          own: message.sender?.name === user.name,
                          from: message.chat
                            ? message.chat.sender?.name === user.name
                              ? message.chat.recipient.name
                              : message.chat.sender.name
                            : message.channel.name,
                          id: message.id,
                          nav: message.chat
                          ? message.chat.sender?.name === user.name
                            ? message.chat.recipient
                            : message.chat.sender
                          : user.channels.find(channel => channel.name === message.channel.name)?.id,
                          answer: message.chat ? true : false,
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                <View style={styles.emptyMessageContainer}>
                  <Text style={styles.emptyMessageText}>У вас нет сохранённых сообщений</Text>
                </View>
              </ScrollView>
            )}
          </>
        )}

      </View>

      <View style={styles.bottomLeft}>
        <HeaderButton title='Создать канал' onPress={() => setShowPopup(true)}>
        </HeaderButton>
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
          <TouchableHighlight onPress={() => setShowPopup(false)}>
            <HeaderButton title={"Создать"} onPress={handleCreateChannel} disabled={!isFormValid} />
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}
