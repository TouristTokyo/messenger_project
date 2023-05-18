import React from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import { useEffect, useState } from "react";
import HeaderButton from '../components/buttons/headerButton';



function RegScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    nickname: '',
    email: '',
    password: ''
  });
  const isFormValid = inputText.email && inputText.password && inputText.email;
  return (
    <View style={styles.containerMain}>
      <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
          <View style={{ marginBottom: 13 }}>
            <DataInput value={inputText.nickname} setValue={(text) => setInputText({ ...inputText, nickname: text })}
              placeholder={"Никнейм"} type={"nickname"} flex={false} />
          </View>
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
              value={inputText.password}
              setValue={(text) => setInputText({ ...inputText, password: text })}
              placeholder={"Пароль"}
              type={"password"}
              flex={false}
            />
          </View>
        </View>


        <View >
          <HeaderButton title={"Зарегистрироваться"} onPress={() => navigation.navigate('Auth')} disabled={!isFormValid} />
        </View>
      </View>

    </View>
  );
}

export default RegScreen;