import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageContext } from './ImageContext';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { updateSelectedImage } = useContext(ImageContext);
 
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('user');
      if (isLoggedInValue === 'true' && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Ошибка при проверке статуса пользователя:', error);
    }
  };

  const login = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    try {
      await AsyncStorage.clear(); 
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Ошибкра при входе:', error);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    updateSelectedImage(null); 
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.clear(); 
    } catch (error) {
      alert('Ошибка при выходе:', error);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
