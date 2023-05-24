import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native-web';
import useStyles from './styles/greetingsScreen.module';
import DataInput from '../components/inputs/textInput/textInput';
import HeaderButton from '../components/buttons/headerButton';

function ForgotScreen({ navigation }) {
  const styles = useStyles();
  const [inputText, setInputText] = useState({
    newPassword: '',
    email: '',
    confirmPassword: '',
    code: ''
  });

  
  const username = 'admin';
  const password = 'root';
  const [receivedCode, setReceivedCode] = useState('');
 
  const isButtonDisabled = () => {
    return (
      !inputText.newPassword ||
      !inputText.email ||
      !inputText.confirmPassword ||
      !inputText.code ||
      inputText.newPassword !== inputText.confirmPassword || inputText.code != receivedCode
    );
  };

  const isDisabled = () => {
    return !inputText.email;
  };

  const getCode = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputText.email)) {
      alert('Invalid email format');
      return;
    }
    const email = encodeURIComponent(inputText.email);
    const apiUrl = `https://messengerproject-production.up.railway.app/api/send_email?email=${email}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReceivedCode(data);
        if (data) {
          alert('Code has been sent to your email');
        } else {
          alert('Failed to get code');
         
        }
      })
      .catch((error) => {
        console.error('Error getting code:', error);
        alert('Failed to get code');
      });
  };
  
  const getUserById = async (email) => {
    try {
      const response = await fetch(`https://messengerproject-production.up.railway.app/api/users/email?email=${email}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
      return userData;
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  };
  
  const updatePassword = async (userId) => {
    try {
      const queryParams = new URLSearchParams({
        new_password: inputText.newPassword,
      });
      const response = await fetch(`https://messengerproject-production.up.railway.app/api/users/${userId}/update/password?${queryParams.toString()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify({
          new_password: inputText.newPassword,
        }),
      });
      if (response.ok) {
        alert('Password updated successfully');
      } else {
        response.json().then(errorData => {
          const errorMessage = errorData.message ;
         alert(errorMessage);
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  
  const handleResetPassword = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(inputText.newPassword)) {
      alert('Invalid password: at least 8 characters long, should contain at least one uppercase letter, at least one lowercase letter,at least one digit, may contain special characters');
      return;
    }
    try {
    
      // Step 2: Get user by email
      const userId = await getUserById(inputText.email);

    // Step 3: Update password
    if (userId) {
      await updatePassword(userId);
      alert('Password updated successfully');
    } else {
      alert('User not found');
    }
  
      // Step 4: Navigate to the Auth screen or show a success message
      navigation.navigate('Auth');
    } catch (error) {
      // Handle any errors here, e.g., show an error message to the user
      alert('Error resetting password:', error);
    }
  };
  

  return (
    <View style={styles.containerMain}>
      <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.email}
              setValue={(text) => setInputText({ ...inputText, email: text })}
              placeholder={'Почта'}
              type={'email'}
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.newPassword}
              setValue={(text) => setInputText({ ...inputText, newPassword: text })}
              placeholder={'Новый пароль'}
              type={'password'}
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.confirmPassword}
              setValue={(text) => setInputText({ ...inputText, confirmPassword: text })}
              placeholder={'Подтвердить пароль'}
              type={'password'}
              flex={false}
            />
          </View>
          <View style={{ marginBottom: 13 }}>
            <DataInput
              value={inputText.code}
              setValue={(text) => setInputText({ ...inputText, code: text })}
              placeholder={'Код'}
              type={'code'}
              flex={false}
            />
          </View>
        </View>

        <View>
          <HeaderButton title={'Изменить пароль'} onPress={handleResetPassword} disabled={isButtonDisabled()} />
        </View>
        <View style={{ marginBottom: 13 }}>
          <HeaderButton title={'Получить код'} onPress={getCode} disabled={isDisabled()} />
        </View>
      </View>
    </View>
  );
}

export default ForgotScreen;
