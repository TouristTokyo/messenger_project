import React, { useContext, useState } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
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

  const handleLogin = () => {
    // Perform any additional validation or data processing before logging in
    const userData = {
      email: inputText.email,
      password: inputText.password
    };

    // Call the login function from the AuthContext
    login(userData);
    console.log(userData);
    navigation.navigate('MainAuth');
  };

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
              value={inputText.password}
              setValue={(text) => setInputText({ ...inputText, password: text })}
              placeholder={"Пароль"}
              type={"password"}
              flex={false}
            />
          </View>
        </View>
        <View style={{ marginTop: 13, marginRight: 13 }}>
          <TouchableHighlight onPress={() => navigation.navigate('Forgot')}>
            <Text>Забыли пароль?</Text>
          </TouchableHighlight>
        </View>

        <View>
          <HeaderButton
            title={"Войти"}
            onPress={handleLogin} // Call the handleLogin function when the button is pressed
            disabled={!isFormValid}
          />
        </View>
        <View style={{ marginBottom: 13 }}>
          <HeaderButton title={"Зарегистрироваться"} onPress={() => navigation.navigate('Reg')} />
        </View>
      </View>
    </View>
  );
}

export default AuthScreen;
