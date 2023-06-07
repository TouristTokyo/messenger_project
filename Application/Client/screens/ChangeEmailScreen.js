import React, { useState, useContext } from 'react';
import { View, TouchableHighlight, useWindowDimensions, ActivityIndicator } from 'react-native-web';
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
  const { user } = useContext(AuthContext);
  const username = 'admin';
  const password = 'root';
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width * 0.0009, height * 0.001);
  const [isLoading, setIsLoading] = useState(false);
  const isButtonDisabled = () => {
    return !inputText.email || !inputText.code || inputText.code != receivedCode;
  };
  const isDisabled = () => {
    return !inputText.email;
  };

  const getCode = () => {
    setIsLoading(true);
    const email = encodeURIComponent(inputText.email);
    const apiUrl = `https://linking-api.onrender.com/api/send_email?email=${email}`;

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
          alert('Код подтверждения был отправлен на указанную почту!');
          setIsLoading(false);
        } else {
          alert('Не удалось отправить код');

        }
      })
      .catch((error) => {
        alert('Ошибка при подключении к серверу', error);
      });
  };

  const changeEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputText.email)) {
      alert('Не правильный формат почты');
      return;
    }
    setIsLoading(true);
    try {
      const userId = user?.id;
      const email = encodeURIComponent(inputText.email);
      const apiUrl = `https://linking-api.onrender.com/api/users/${userId}/update/email?email=${email}`;

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        alert('Почта успешно обновлена');
        setEmail(inputText.email);
        setIsLoading(false);
      } else {
        alert('Не удалось обновить почту');
      }
    } catch (error) {
      alert('Ошибка при подключении к серверу', error);
    }
  };


  return (
    <View style={styles.containerMain}>
      {isLoading && (
        <View style={styles.textContainer}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color='rgba(0, 118, 185, 0.35)' />
          </View>
        </View>
      )}
      {!isLoading && (
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

      )}
      <View style={[styles.topLeft, { transform: [{ scale }] }]}>
        <TouchableHighlight onPress={() => navigation.navigate('Profile')}>
          <BackSvg />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ChangeEmailScreen;
