import React from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import { useEffect, useState } from "react";
import HeaderButton from '../components/buttons/headerButton';



function AuthScreen({ navigation}) {
    const styles = useStyles();
    const [inputText, setInputText] = useState({
        password: '',
        email: ''
      });
  return (
    <View style={styles.containerMain}>
    <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.email} setValue={(text) => setInputText({...inputText, email: text})} placeholder={"Почта"} />
    </View>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.password} setValue={(text) => setInputText({...inputText, password: text})} placeholder={"Пароль"} />
    </View>
    </View>
    <View style={{marginTop: 13, marginRight: 13}}>
    <TouchableHighlight onPress={() => navigation.navigate('Forgot')} >
        <Text>Забыли пароль?</Text>
    </TouchableHighlight>
    </View>
    
    <View >
    <HeaderButton title={"Войти"} onPress={() => console.log()}/>
    </View>
    <View style={{marginBottom: 13}}>
    <HeaderButton title={"Зарегистрироваться"} onPress={() => navigation.navigate('Reg')}/>
    </View>
    </View>
    
  </View>
  );
}

export default AuthScreen;