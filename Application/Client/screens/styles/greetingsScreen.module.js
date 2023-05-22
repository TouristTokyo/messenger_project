import { StyleSheet } from 'react-native-web';
import React, { useEffect, useState } from 'react';

export default function useStyles() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerButton: {
      marginTop: 30,
    },
    containerMain: {
      flex: 1,
      backgroundColor: 'rgba(0, 118, 185, 0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomLeft: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
    topLeft: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    textContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      padding: 30,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      position: 'absolute',
      top: '30%',
      alignSelf: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      position: 'absolute',
      top: '30%',
      width: '40%',
      height: '40%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Montserrat-Regular',
      color: '#000000',
      fontSize: 24,
      textAlign: 'center',
    },
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
    },
    // You can add more styles as needed
  });
}
