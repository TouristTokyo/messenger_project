import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(null);

  useEffect(() => {
    checkLoginStatus();
    checkCurrentScreen();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('user');
      if (isLoggedIn === 'true' && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error during checkLoginStatus:', error);
    }
  };

  const checkCurrentScreen = async () => {
    try {
      const storedScreen = await AsyncStorage.getItem('currentScreen');
      setCurrentScreen(storedScreen);
    } catch (error) {
      console.error('Error during checkCurrentScreen:', error);
    }
  };

  const saveCurrentScreen = async (screen) => {
    setCurrentScreen(screen);
    try {
      await AsyncStorage.setItem('currentScreen', screen);
    } catch (error) {
      console.error('Error during saveCurrentScreen:', error);
    }
  };

  const login = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      // localStorage.setItem('currentScreen', screen); // Remove this line
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('currentScreen'); // Use AsyncStorage to remove the item
      // navigation.navigate('Auth'); // Assuming you have a navigation object available
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
    currentScreen,
    saveCurrentScreen,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
