import React, { useEffect, useState } from 'react';
import { View } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';

function RegScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    name: '',
    email: '',
    password: ''
  });

  const username = 'admin';
  const password = 'root';

  const isFormValid = inputText.name && inputText.password && inputText.email;

  const handleRegistration = () => {
    const requestBody = {
      name: inputText.name,
      email: inputText.email,
      password: inputText.password
    };

    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          navigation.navigate('Auth');
        } else {
          console.error('Registration failed');
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
              value={inputText.name}
              setValue={text => setInputText({ ...inputText, name: text })}
              placeholder="Никнейм"
              type="nickname"
              flex={false}
            />
          </View>
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
        <View>
          <HeaderButton
            title="Зарегистрироваться"
            onPress={handleRegistration}
            disabled={!isFormValid}
          />
        </View>
      </View>
    </View>
  );
}

export default RegScreen;
