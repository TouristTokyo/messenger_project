import React from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import { useEffect, useState } from "react";
import HeaderButton from '../components/buttons/headerButton';



function ForgotScreen({ navigation}) {
    const styles = useStyles();
    const [inputText, setInputText] = useState({
        newPassword: '',
        email: '',
        confirmPassword:'',
        code:''
      });
  return (
    <View style={styles.containerMain}>
    <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.email} setValue={(text) => setInputText({...inputText, email: text})} placeholder={"Почта"} />
    </View>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.newPassword} setValue={(text) => setInputText({...inputText, newPassword: text})} placeholder={"Новый пароль"} />
    </View>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.confirmPassword} setValue={(text) => setInputText({...inputText, confirmPassword: text})} placeholder={"Подтвердить пароль"} />
    </View>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.code} setValue={(text) => setInputText({...inputText, code: text})} placeholder={"Код"} />
    </View>
    </View>
    
    
    <View >
    <HeaderButton title={"Изменить пароль"} onPress={() => navigation.navigate('Auth')}/>
    </View>
    <View style={{marginBottom: 13}}>
    <HeaderButton title={"Получить код"} onPress={() => console.log()}/>
    </View>
    </View>
    
  </View>
  );
}

export default ForgotScreen;