import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TouchableHighlight, Alert } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';
import BackSvg from '../assets/icons/backSvg';
import AuthContext from '../context/AuthContext';
import { setEmail } from '../context/AsyncStorageUtil';

function ChangeEmailScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    email: '',
    code: '',
  });
  const [receivedCode, setReceivedCode] = useState('');

  const { user, updateUser } = useContext(AuthContext);
  const username = 'admin';
  const password = 'root';

  const isButtonDisabled = () => {
    return !inputText.email || !inputText.code || inputText.code != receivedCode;
  };

  const isDisabled = () => {
    return !inputText.email;
  };

  const getCode = () => {
    const email = encodeURIComponent(inputText.email);
    const apiUrl = `https://messengerproject-production.up.railway.app/api/send_email?email=${email}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReceivedCode(data);
        if (data) {
          alert('Code has been sent to your email');
         
        } else {
          alert('Failed to get code');
          
        }
      })
      .catch((error) => {
        console.error('Error getting code:', error);
        alert('Failed to get code');
      });
  };

  const changeEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputText.email)) {
      alert('Invalid email format');
      return;
    }
  try {
    const userId = user?.id;
    const email = encodeURIComponent(inputText.email);
    const apiUrl = `https://messengerproject-production.up.railway.app/api/users/${userId}/update/email?email=${email}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    if (response.ok) {
      alert('Email updated successfully');
      // Use setEmail to update the email value
      setEmail(inputText.email);
    } else {
      alert('Failed to update email');
    }
  } catch (error) {
    console.error('Error updating email:', error);
    alert('Failed to update email');
  }
};


  return (
    <View style={styles.containerMain}>
      <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.email}
              setValue={(text) => setInputText({ ...inputText, email: text })}
              placeholder={"Почта"}
              type={"email"}
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.code}
              setValue={(text) => setInputText({ ...inputText, code: text })}
              placeholder={"Код"}
              type={"code"}
              flex={false}
            />
          </View>
        </View>

        <View>
          <HeaderButton
            title={"Изменить почту"}
            onPress={changeEmail}
            disabled={isButtonDisabled()}
          />
        </View>
        <View style={{ marginBottom: 13 }}>
          <HeaderButton
            title={"Получить код"}
            onPress={getCode}
            disabled={isDisabled()}
          />
        </View>
      </View>
      <View style={styles.topLeft}>
        <TouchableHighlight onPress={() => navigation.navigate('Profile')}>
          <BackSvg />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ChangeEmailScreen;
