import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    return StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'flex-end',
        },
        avatar: {
          alignSelf: 'flex-start',
        },
        messageBox: {
          marginLeft: 15,
          flex: 1,
          backgroundColor: '#E7DEDE',
          borderLeftWidth: 5,
          borderLeftColor: '#0076B9',
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
          maxWidth: '40%',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
        ownMessageBox: {
          backgroundColor: 'rgba(0, 118, 185, 0.35)',
          borderLeftColor: '#0076B9',
          borderLeftWidth: 5,
          marginLeft: 15,
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
          maxWidth: '40%',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
        nickname: {
          fontSize: 24,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: 5,
        },
        ownNickname: {
          fontSize: 24,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: 5,
        },
        message: {
          fontSize: 19,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          flexWrap: 'wrap',
          marginBottom: 10
        },
        ownMessage: {
          fontSize: 19,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          flexWrap: 'wrap',
          marginBottom: 10
        },
      });
}