import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
      console.error('Error during checkLoginStatus:', error);
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
     
      navigation.navigate("Auth"); // Assuming you have a navigation object available
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
   
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
