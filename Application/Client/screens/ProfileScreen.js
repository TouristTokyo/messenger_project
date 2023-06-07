import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useStyles from './styles/mainAuthScreen.module';
import HeaderButton from '../components/buttons/headerButton';
import ChangeAvatar from '../components/Avatar/ChangeAvatar/changeAvatar';
import BackSvg from '../assets/icons/backSvg';
import AddSvg from '../assets/icons/addSvg';
import NicknameInput from '../components/inputs/nicknameInput/nicknameInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';
import { setProfileNickname, getProfileNickname, getEmail } from '../context/AsyncStorageUtil';

export default function ProfileScreen({ navigation }) {
  const styles = useStyles();
  const { selectedImage } = useContext(ImageContext);
  const { user } = useContext(AuthContext);
  const [inputText, setInputText] = useState({
    name: user?.name || '', 
  });
  const { width, height } = useWindowDimensions();
  const username = 'admin';
  const password = 'root';
  const [userText, setUserText] = useState('');
  const scale = Math.min(width *0.0009, height *0.001);

  useFocusEffect(
    React.useCallback(() => {
      fetchEmail();
    }, [user])
  );

  const fetchEmail = async () => {
    try {
      const email = await getEmail();
      if (email && email !== userText) {
        setUserText(email);
      } else if (!email && !userText) {
        setUserText(user?.email || '');
      }
    } catch (error) {
      console.log('Ошибка при подгрузке почты:', error);
    }
  };
  const emailContainerRef = useRef(null);
  const [emailFontSize, setEmailFontSize] = useState(36);


  const [showInputField, setShowInputField] = useState(false); 
  const [rotationDeg, setRotationDeg] = useState(0);

  useEffect(() => {
    handleEmailLayout();
    fetchSavedNickname();
  }, []);

  const handleEmailLayout = () => {
    const emailContainerWidth = emailContainerRef.current.offsetWidth;
    const desiredMaxWidth = 300;
    const desiredMaxFontSize = Math.min(width * 0.02, height * 0.045);
    const emailFontSize = Math.min(desiredMaxFontSize, (desiredMaxWidth / emailContainerWidth) * desiredMaxFontSize);
    setEmailFontSize(emailFontSize);
  };

  const fetchSavedNickname = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem('profile_nickname');
      if (savedNickname) {
        setInputText({ name: savedNickname });
      }
    } catch (error) {
      console.log('Error fetching saved nickname:', error);
    }
  };

  const handleAddSvgPress = async () => {
    if (showInputField) {
      setShowInputField(false);
      setRotationDeg(0);
      try {
        await setProfileNickname(inputText.name);
        if (inputText.name !== user.name) {
          await updateName(inputText.name);
        }
      } catch (error) {
        console.log('Ошибка сохранения никнейма:', error);
      }
    } else {
      setShowInputField(true);
      setRotationDeg(90); 
    }
    try {
      const profileNickname = await getProfileNickname();
      console.log('Profile nickname:', profileNickname);
    } catch (error) {
      console.log('Ошибка при подгрузке никнейма:', error);
    }
  };

  const addSvgStyle = {
    transform: `rotate(${showInputField ? 45 : 0}deg)`,
    transition: 'transform 0.5s ease', 
  };

  const updateName = async (newName) => {
    try {
      const id = user?.id; 
      if (id) {
        const response = await fetch(`https://linking-api.onrender.com/api/users/${id}/update/name?name=${encodeURIComponent(newName)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          },
        });

        if (response.ok) {
        } else {
          alert('Не удалось обновить имя пользователя');
        }
      }
    } catch (error) {
      alert('Ошибка при подключении к серверу', error);
    }
  };




  return (
    <View style={styles.containerMain}>
      <View style={styles.profileSettingsContainer}>
        <View style={{ marginBottom: 13 }}>
          <ChangeAvatar  children={selectedImage}/>
        </View>
        <View style={styles.nicknameContainer}>
          {showInputField ? (
            <NicknameInput
              value={inputText.name}
              setValue={(text) => setInputText({ ...inputText, name: text })}
              flex={false}
            />
          ) : (
            <Text style={{ fontSize:  Math.min(width * 0.03, height * 0.055), fontFamily: 'Montserrat-Regular', paddingHorizontal: 30 }}>
              {inputText.name}
            </Text>
          )}
          <TouchableOpacity onPress={handleAddSvgPress}>
            <AddSvg style={addSvgStyle} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#000000',
            paddingHorizontal: 10,
            paddingVertical: 15,
            width: width * 0.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: 13,
          }}
        >
          <View ref={emailContainerRef} onLayout={handleEmailLayout}>
            <Text
              style={{
                color: '#000000',
                fontSize: emailFontSize,
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
                marginBottom: 13,
              }}
            >
              {userText ? userText : user.email}
            </Text>
          </View>
        </View>
        <View style = {{alignItems: 'center', width: '100%', marginLeft: 20}}>
          <HeaderButton title={'Изменить почту'} onPress={() => navigation.navigate('ChangeEmail')} />
        </View>
        <View style={{ marginBottom: 13,alignItems: 'center', width: '100%', marginLeft: 20}}>
          <HeaderButton title={'Изменить пароль'} onPress={() => navigation.navigate('ChangePassword')} />
        </View>
      </View>
      <View style={[styles.topLeft, { transform: [{ scale }] }]}>
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <BackSvg />
        </TouchableHighlight>
      </View>
    </View>
  );
}
