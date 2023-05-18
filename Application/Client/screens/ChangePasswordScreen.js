import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';
import BackSvg from '../assets/icons/backSvg';

function ChangePasswordScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    newPassword: '',
    password: '',
    confirmPassword: '',
 
  });

  // Функция, которая проверяет, заполнены ли все поля и равны ли поля новый пароль и подтвердить пароль
  const isButtonDisabled = () => {
    return !inputText.newPassword || !inputText.password || !inputText.confirmPassword  || inputText.newPassword !== inputText.confirmPassword;
  }
  

  return (
    <View style={styles.containerMain}>
      <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
        <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.password}
              setValue={(text) => setInputText({ ...inputText, password: text })}
              placeholder={"Пароль"}
              type={"password"}
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.newPassword}
              setValue={(text) => setInputText({ ...inputText, newPassword: text })}
              placeholder={"Новый пароль"}
              type={"password"}
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.confirmPassword}
              setValue={(text) => setInputText({ ...inputText, confirmPassword: text })}
              placeholder={"Подтвердить пароль"}
              type={"password"}
              flex={false}
            />
          </View>
        </View>

        <View >
          <HeaderButton title={"Изменить пароль"} onPress={() => navigation.navigate('Profile')} disabled={isButtonDisabled()} />
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
