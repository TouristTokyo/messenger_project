import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import useStyles from './styles/mainAuthScreen.module';
import HeaderButton from '../components/buttons/headerButton';
import ChangeAvatar from '../components/Avatar/ChangeAvatar/changeAvatar';
import BackSvg from '../assets/icons/backSvg';
import CrossSvg from '../assets/icons/crossSvg';
import AddSvg from '../assets/icons/addSvg';
import NicknameInput from '../components/inputs/nicknameInput/nicknameInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageContext } from '../context/ImageContext';

export default function ProfileScreen({ navigation }) {
  const styles = useStyles();
  const { selectedImage } = useContext(ImageContext);
  const [inputText, setInputText] = useState({
    nickname: '', // Use an empty string as the initial value
  });
  const isFormValid = inputText.nickname;

  const emailContainerRef = useRef(null);
  const [emailFontSize, setEmailFontSize] = useState(36);
  const [emailText, setEmailText] = useState('ilia.stavier@mail.ru');

  const [showInputField, setShowInputField] = useState(false); // Track the visibility of the input field
  const [rotationDeg, setRotationDeg] = useState(0);

  useEffect(() => {
    handleEmailLayout();
    fetchSavedNickname();
  }, []);

  const handleEmailLayout = () => {
    const emailContainerWidth = emailContainerRef.current.offsetWidth;
    const desiredMaxWidth = 300; // You can adjust this as needed
    const desiredMaxFontSize = 36; // You can adjust this as needed
    const emailFontSize = Math.min(desiredMaxFontSize, (desiredMaxWidth / emailContainerWidth) * desiredMaxFontSize);
    setEmailFontSize(emailFontSize);
  };

  const fetchSavedNickname = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem('profile_nickname');
      if (savedNickname) {
        setInputText({ nickname: savedNickname });
      }
    } catch (error) {
      console.log('Error fetching saved nickname:', error);
    }
  };

  const handleAddSvgPress = async () => {
    if (showInputField) {
      // Save changes and hide the input field
      setShowInputField(false);
      setRotationDeg(0); // Reset the rotation to 0 degrees
      try {
        await AsyncStorage.setItem('profile_nickname', inputText.nickname);
      } catch (error) {
        console.log('Error saving nickname:', error);
      }
    } else {
      // Show the input field and rotate the AddSvg icon
      setShowInputField(true);
      setRotationDeg(90); // Rotate by 90 degrees
    }
  };

  // CSS style to apply the rotation transformation to the AddSvg icon
  const addSvgStyle = {
    transform: `rotate(${showInputField ? 45 : 0}deg)`,
    transition: 'transform 0.5s ease', // Smooth transition for rotation animation
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.profileSettingsContainer}>
        <View style={{ marginBottom: 13 }}>
          <ChangeAvatar children={selectedImage}/>
        </View>
        <View style={styles.nicknameContainer}>
          {showInputField ? (
            <NicknameInput
              value={inputText.nickname}
              setValue={(text) => setInputText({ ...inputText, nickname: text })}
              flex={false}
            />
          ) : (
            <Text style={{ fontSize: 48, fontFamily: 'Montserrat-Regular', paddingHorizontal: 30 }}>
              {inputText.nickname}
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
            width: '80%',
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
              {emailText}
            </Text>
          </View>
        </View>
        <View>
          <HeaderButton title={'Изменить почту'} onPress={() => navigation.navigate('ChangeEmail')} />
        </View>
        <View style={{ marginBottom: 13 }}>
          <HeaderButton title={'Изменить пароль'} onPress={() => navigation.navigate('ChangePassword')} />
        </View>
      </View>
      <View style={styles.topLeft}>
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <BackSvg />
        </TouchableHighlight>
      </View>
    </View>
  );
}