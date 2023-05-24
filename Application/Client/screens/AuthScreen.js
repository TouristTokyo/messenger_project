import React, { useContext, useState } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native-web';
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

  const handleLogin = () => {
    // Validate the email format

    // Create the request body
    const requestBody = {
      email: inputText.email,
      password: inputText.password
    };

    // Send the API request
    fetch('https://messengerproject-production.up.railway.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        // Handle the response
        if (response.ok) {
          // Login successful
          // Assuming the response contains user data or token, you can pass it to the login function
          response.json().then(data => {
            login(data); // Pass the user data or token to the login function from AuthContext
          });
        } else {
          // Login failed
          response.json().then(errorData => {
            const errorMessage = errorData.message || 'Login failed';
            alert(errorMessage);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.containerMain}>
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
    </View>
  );
}

export default AuthScreen;
