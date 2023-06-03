import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 10,
      maxWidth: '100%',
    },
    ownContainer: {
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
      marginBottom: 10,
      maxWidth: '100%',
    },
    avatar: {
      alignSelf: 'flex-start',
    },
    messageBox: {
      backgroundColor: '#E7DEDE',
      paddingVertical: 10,
      paddingHorizontal: 15,
      maxWidth: '60%',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      position: 'relative',
    },
    box: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    ownMessageBox: {
      backgroundColor: 'rgba(0, 118, 185, 0.35)',
      paddingVertical: 10,
      paddingHorizontal: 15,
      maxWidth: '60%',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      position: 'relative',
    },
    forward: {
      alignSelf: 'flex-end',
      marginBottom: 5,
    },
    ownForward: {
      alignSelf: 'flex-start',
      marginBottom: 5,
    },
    nickname: {
      fontSize: Math.min(width * 0.012, height * 0.032),
      fontFamily: 'Montserrat-Bold',
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 5,
    },
    role: {
      fontSize: Math.min(width * 0.012, height * 0.032),
      fontFamily: 'Montserrat-Regular',
      color: '#0076B9',
      marginBottom: 5,
    },
    message: {
      fontSize: Math.min(width * 0.01, height * 0.03),
      fontFamily: 'Montserrat-Regular',
      color: 'black',
      flexWrap: 'wrap',
      marginBottom: 5,
    },
    time: {
      fontSize: Math.min(width * 0.008, height * 0.025),
      fontFamily: 'Montserrat-Regular',
      color: 'black',
      alignSelf: 'flex-end',
    },
    ownTime: {
      fontSize: Math.min(width * 0.008, height * 0.025),
      fontFamily: 'Montserrat-Regular',
      color: 'black',
      alignSelf: 'flex-start',
    },
    bubbleTail: {
      position: 'absolute',
      top: 0,
      left: -10,
      width: 0,
      height: 0,
      borderTopWidth: 10,
      borderTopColor: 'transparent',
      borderBottomWidth: 10,
      borderBottomColor: 'transparent',
      borderRightWidth: 10,
      borderRightColor: '#E7DEDE',
    },
    ownBubbleTail: {
      position: 'absolute',
      top: 0,
      right: -10,
      width: 0,
      height: 0,
      borderTopWidth: 10,
      borderTopColor: 'transparent',
      borderBottomWidth: 10,
      borderBottomColor: 'transparent',
      borderLeftWidth: 10,
      borderLeftColor: 'rgba(0, 118, 185, 0.35)',
    },
  });
}
