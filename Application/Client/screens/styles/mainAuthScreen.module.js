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
      marginTop: 30, // задаем отступ сверху для кнопки
    },
    channNameContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: 80,
      paddingLeft: 10,
      overflow: 'hidden',
      position: 'absolute',
    },
    dataInputContainer: {
      marginRight: 10,
    },
    nicknameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 13,
    },
    containerMain: {
      flex: 1,
      backgroundColor: 'rgba(0, 118, 185, 0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerSettings: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: "row",
      alignItems: 'center',
      backgroundColor: 'rgba(0, 118, 185, 0.35)',
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
      width: '30%',
      height: '40%',
      overflow: 'hidden',
      position: 'absolute',
      top: 40, // set top to 20px
      right: 80, // set right to 20px
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
    },
    barContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      width: '50%',
      height: '10%',
      overflow: 'hidden',
      position: 'absolute',
      top: 40, // set top to 20px
      right: 80, // set right to 20px
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
    },
    barChanContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      width: '50%',
      height: '10%',
      overflow: 'hidden',
      position: 'absolute',
      top: 40,
      right: 80,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // align items vertically to the center
    },
    barText: {
      fontSize: 24,
      paddingLeft: 20,
    },
    settingsContainer: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      width: '30%',
      height: '40%',
      overflow: 'hidden',
      position: 'absolute',
      
    },
    sendContainer: {
      width: '40%',
      height: '10%',
      position: 'absolute',
      bottom: 0,
      right: 200,
      marginTop: 50
    },
    forwardContainer: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 25,
      width: '35%',
      height: '45%',
      overflow: 'hidden',
      position: 'absolute',
      bottom: 40, // set top to 20px
      right: 80, // set right to 20px
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
    },
    historyContainer: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 15,
      marginTop: 30,
      width: '35%',
      height: '70%',
      overflow: 'hidden',
      position: 'absolute',
      top: '50%', // center vertically
      right: 225, // move more to the right
      transform: [{ translateY: '-50%' }], // center vertically
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
    },
    profileContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      width: '20%',
      height: '50%',
      overflow: 'hidden',
      position: 'absolute',
      top: 40, // set top to 20px
      left: 80, // set right to 20px
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 60,
      paddingBottom: 60
    },
    profileSettingsContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 35,
      width: '24%',
      overflow: 'hidden',
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
      paddingBottom: 30,
      alignSelf: 'stretch',
      marginTop: 'auto',
      marginBottom: 'auto',
      left: '50%',
      top: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    },


    popupContainer: {
      backgroundColor: '#E7DEDE',
      borderRadius: 35,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
      position: 'absolute',
      top: '50%', // set top to 50%
      left: '50%', // set left to 50%
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }], // adjust position based on element size
      width: '20%',
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column', // add this line to make items centered in a column
    },
    text: {
      color: '#000000',
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 13
    },
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20
    },
  });
}