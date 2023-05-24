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
          fontSize: 24,
          fontFamily: 'Montserrat-Bold',
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 5,
        },
        role: {
          fontSize: 24,
          fontFamily: 'Montserrat-Regular',
          color: '#0076B9',
          marginBottom: 5,
        },
        message: {
          fontSize: 19,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          flexWrap: 'wrap',
          marginBottom: 5,
        },
        time: {
          fontSize: 14,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          alignSelf: 'flex-end',
        },
        ownTime: {
          fontSize: 14,
          fontFamily: 'Montserrat-Regular',
          color: 'black',
          alignSelf: 'flex-start',
        },
      });
}