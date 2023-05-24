import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useStyles from './styles/mainAuthScreen.module';
import HeaderButton from '../components/buttons/headerButton';
import ChangeAvatar from '../components/Avatar/ChangeAvatar/changeAvatar';
import BackSvg from '../assets/icons/backSvg';
import CrossSvg from '../assets/icons/crossSvg';
import AddSvg from '../assets/icons/addSvg';
import NicknameInput from '../components/inputs/nicknameInput/nicknameInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';
import { setProfileNickname, getProfileNickname, getEmail } from '../context/AsyncStorageUtil';

export default function ProfileScreen({ navigation }) {
  const styles = useStyles();
  const { selectedImage } = useContext(ImageContext);
  const { user, updateUser } = useContext(AuthContext);

  // Access the user object from the AuthContext
  const [inputText, setInputText] = useState({
    name: user?.name || '', // Use the user's current name as the initial value if available
  });
  const isFormValid = inputText.name;

  const username = 'admin';
  const password = 'root';
  const [userText, setUserText] = useState('');

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
      console.log('Error retrieving profile email:', error);
    }
  };
  const emailContainerRef = useRef(null);
  const [emailFontSize, setEmailFontSize] = useState(36);


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
        setInputText({ name: savedNickname });
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
        await setProfileNickname(inputText.name);
        // Call the updateName function only if the name is different from the current value
        if (inputText.name !== user.name) {
          await updateName(inputText.name); // Call the updateName function to send the PUT request
        }
      } catch (error) {
        console.log('Error saving nickname:', error);
      }
    } else {
      // Show the input field and rotate the AddSvg icon
      setShowInputField(true);
      setRotationDeg(90); // Rotate by 90 degrees
    }

    // Access the profile nickname from AsyncStorage after saving it
    try {
      const profileNickname = await getProfileNickname();
      console.log('Profile nickname:', profileNickname);
    } catch (error) {
      console.log('Error retrieving profile nickname:', error);
    }
  };


  // CSS style to apply the rotation transformation to the AddSvg icon
  const addSvgStyle = {
    transform: `rotate(${showInputField ? 45 : 0}deg)`,
    transition: 'transform 0.5s ease', // Smooth transition for rotation animation
  };

  const updateName = async (newName) => {
    try {
      const id = user?.id; // Assuming the user object has an 'id' property
      if (id) {
        const response = await fetch(`https://messengerproject-production.up.railway.app/api/users/${id}/update/name?name=${encodeURIComponent(newName)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          },
        });

        if (response.ok) {
          // Update the user object in the AuthContext if the update is successful

        } else {
          console.error('Failed to update name');
        }
      }
    } catch (error) {
      console.error('Error updating name:', error);
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
            <Text style={{ fontSize: 48, fontFamily: 'Montserrat-Regular', paddingHorizontal: 30 }}>
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
              {userText ? userText : user.email}
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
