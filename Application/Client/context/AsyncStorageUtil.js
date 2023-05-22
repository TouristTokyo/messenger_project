import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setProfileNickname(nickname) {
  try {
    await AsyncStorage.setItem('profile_nickname', nickname);
  } catch (error) {
    console.log('Error saving nickname:', error);
  }
}

export async function getProfileNickname() {
  try {
    const nickname = await AsyncStorage.getItem('profile_nickname');
    return nickname;
  } catch (error) {
    console.log('Error retrieving nickname:', error);
    return null;
  }
}

export async function setEmail(email) {
  try {
    await AsyncStorage.setItem('profile_email', email);
  } catch (error) {
    console.log('Error saving email:', error);
  }
}

export async function getEmail() {
  try {
    const email = await AsyncStorage.getItem('profile_email');
    return email;
  } catch (error) {
    console.log('Error retrieving email:', error);
    return null;
  }
}
