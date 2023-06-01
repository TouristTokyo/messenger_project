import React, { useState, useContext } from 'react';
import { View, TouchableHighlight } from 'react-native';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';
import BackSvg from '../assets/icons/backSvg';
import AuthContext from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

function ChangePasswordScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    newPassword: '',
    password: '',
    confirmPassword: '',
  });
  const username = 'admin';
  const password = 'root';
  const { user, storeCurrentScreen } = useContext(AuthContext);
  const id = user?.id; 
  useFocusEffect(
    React.useCallback(() => {
        storeCurrentScreen('ChangePassword')
    }, [])
);
  const isButtonDisabled = () => {
    return (
      !inputText.newPassword ||
      !inputText.password ||
      !inputText.confirmPassword 
    );
  };

  const handleUpdatePassword = async () => {
    if (inputText.newPassword !== inputText.confirmPassword) {
      return alert('Новый пароль не совпадает с полем полем подтверждения');
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(inputText.password)&& !passwordRegex.test(inputText.newPassword)) {
      alert('Неправильный формат пароля: минимум 8 символов в длину, должен содержать минимум одну заглавную и строчную букву, минимум одну цифру, также может содержать специальный символы( !@#$%^&*)');
      return;
    }
    const id = user?.id;
    const queryParams = new URLSearchParams({
      last_password: inputText.password,
      new_password: inputText.newPassword,
    });
  
    try {
      const response = await fetch(`https://backend-web-service-test.onrender.com/api/users/${id}/update/password?${queryParams.toString()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
  
      if (response.ok) {
        alert('Пароль обновлен');
      } else {
        alert('Не удалось обновить пароль');
      }
    } catch (error) {
      alert('Ошибка при подключении к серверу:', error);
    }
  };
  

  return (
    <View style={styles.containerMain}>
      <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.password}
              setValue={(text) => setInputText({ ...inputText, password: text })}
              placeholder="Пароль"
              type="password"
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.newPassword}
              setValue={(text) => setInputText({ ...inputText, newPassword: text })}
              placeholder="Новый пароль"
              type="password"
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.confirmPassword}
              setValue={(text) => setInputText({ ...inputText, confirmPassword: text })}
              placeholder="Подтвердить пароль"
              type="password"
              flex={false}
            />
          </View>
        </View>

        <View>
          <HeaderButton
            title="Изменить пароль"
            onPress={handleUpdatePassword}
            disabled={isButtonDisabled()}
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

export default ChangePasswordScreen;
