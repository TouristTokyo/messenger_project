import React from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import { useEffect, useState } from "react";
import HeaderButton from '../components/buttons/headerButton';



function RegScreen({ navigation}) {
    const styles = useStyles();
    const [inputText, setInputText] = useState({
        nickname: '',
        email: '',
        password:''
      });
  return (
    <View style={styles.containerMain}>
    <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.nickname} setValue={(text) => setInputText({...inputText, nickname: text})} placeholder={"Никнейм"} />
    </View>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.email} setValue={(text) => setInputText({...inputText, email: text})} placeholder={"Почта"} />
    </View>
    <View style={{marginBottom: 13}}>
    <DataInput value={inputText.password} setValue={(text) => setInputText({...inputText, password: text})} placeholder={"Пароль"} />
    </View>
    </View>
    
    
    <View >
    <HeaderButton title={"Зарегистрироваться"} onPress={() => navigation.navigate('Auth')}/>
    </View>
    </View>
    
  </View>
  );
}

export default RegScreen;