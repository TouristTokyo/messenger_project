import React, { useContext, useState } from 'react';
import { View, Text, TouchableHighlight, ActivityIndicator } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';
import AuthContext from '../context/AuthContext';

function AuthScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    password: '',
    email: ''
  });
  const isFormValid = inputText.email && inputText.password;
  const { login } = useContext(AuthContext);
  const username = 'admin';
  const password = 'root';
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputText.email)) {
      alert('Не верный формат почты');
      return;
    }
    setIsLoading(true);
    const requestBody = {
      email: inputText.email,
      password: inputText.password
    };

    fetch('https://linking-api.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            login(data);
          });
        } else {
          response.json().then(errorData => {
            const errorMessage = errorData.message || 'Login failed';
            alert(errorMessage);
          });
         
        }
      })
      .catch(error => {
        alert('Ошибка подключения к серверу', error);
      });
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
              setValue={text => setInputText({ ...inputText, email: text })}
              placeholder="Почта"
              type="email"
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.password}
              setValue={text => setInputText({ ...inputText, password: text })}
              placeholder="Пароль"
              type="password"
              flex={false}
            />
          </View>
        </View>
        <View style={{ marginTop: 13, marginRight: 13 }}>
          <TouchableHighlight onPress={() => navigation.navigate('Forgot')}>
            <Text style = {{fontFamily: 'Montserrat-Regular'}}>Забыли пароль?</Text>
          </TouchableHighlight>
          <View style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              width: '100%',
            }} />
        </View>

        <View>
          <HeaderButton
            title="Войти"
            onPress={handleLogin}
            disabled={!isFormValid}
          />
        </View>
        <View style={{ marginBottom: 13 }}>
          <HeaderButton
            title="Зарегистрироваться"
            onPress={() => navigation.navigate('Reg')}
          />
        </View>
        </View>
        )}

     
    </View>
  );
}

export default AuthScreen;
