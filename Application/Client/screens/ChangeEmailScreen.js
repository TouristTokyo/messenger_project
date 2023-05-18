import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';
import BackSvg from '../assets/icons/backSvg';

function ChangeEmailScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    newPassword: '',
    email: '',
    confirmPassword: '',
    code: ''
  });

  // Функция, которая проверяет, заполнены ли все поля и равны ли поля новый пароль и подтвердить пароль
  const isButtonDisabled = () => {
    return !inputText.newPassword || !inputText.email || !inputText.confirmPassword || !inputText.code || inputText.newPassword !== inputText.confirmPassword;
  }
  const isDisabled = ()=> {
    return !inputText.email; 
  }

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

        <View >
          <HeaderButton title={"Изменить почту"} onPress={() => navigation.navigate('Profile')} disabled={isButtonDisabled()} />
        </View>
        <View style={{ marginBottom: 13 }}>
          <HeaderButton title={"Получить код"} onPress={() => console.log()} disabled = {isDisabled()}/>
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
