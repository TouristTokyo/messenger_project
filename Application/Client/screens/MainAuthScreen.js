import React, { useState, useContext } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView } from 'react-native-web';
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

export default function MainAuthScreen({ navigation }) {
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState({
    nickname: '',
  });
  const { selectedImage } = useContext(ImageContext);
  const { logout } = useContext(AuthContext);
  const { forwardedMessages, clearForwardedMessages } = useContext(MessageContext);
  
  const history = [
    {
      avatarUrl: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg',
      username: "John Doe",
      onPress: ({ }) => navigation.navigate('Chat'),
      containerStyle: { flex: 1 }
    },
    {
      username: "Channel 1",
      onPress: ({ }) => navigation.navigate('Channel'),
      containerStyle: { flex: 1 },
    },
  ];
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
  ]

 

  return (
    <View style={styles.containerMain}>
      <View style={styles.messageContainer}>
        <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
          {history.map((data, index) => (
            <SearchBody key={index} data={data} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.profileContainer}>
        <ShowAvatar imageUrl={selectedImage} profile={true} />
        <Text style={{
          color: '#000000',
          fontSize: 48,
          textAlign: 'center',
          marginBottom: 13
        }}>Username</Text>
        {buttons.map((data, index) => (
          <View style={{ width: '70%' }} key={index}>
            <BorderButton data={data} />
          </View>
        ))}
      </View>
      <View style={styles.forwardContainer}>
        {forwardedMessages.length > 0 && (
          <View style={{ right: 50, position: 'absolute', zIndex: 1 }}>
            <TouchableHighlight onPress={clearForwardedMessages}>
              <DeleteSvg />
            </TouchableHighlight>
          </View>
        )}
        <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
          {forwardedMessages.map((data, index) => (
            <View style={{ marginBottom: 13 }} key={index}>
              <ForwardMessage data={data} />
            </View>
          ))}
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
          <TouchableOpacity onPress={() => setShowPopup(false)}>
            <View>
              <HeaderButton title={"Создать"} onPress={() => console.log()} disabled={!isFormValid} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}