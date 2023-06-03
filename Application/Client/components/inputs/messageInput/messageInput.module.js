import {StyleSheet, useWindowDimensions} from "react-native-web";

export default function useStyles() {
    const {width, height} = useWindowDimensions();
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingVertical: 20,
        },
        input: {
            flex: 1,
            height: Math.min(width * 0.03, height * 0.055),
            fontSize: Math.min(width * 0.01, height * 0.03),
            paddingLeft: 40,
            paddingVertical: 5,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            color: '#000000',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 1)',
            fontFamily: 'Montserrat-Regular',
            alignSelf: 'flex-start',
            marginRight: 30
        },
        sendButton: {
            transform: [{rotate: '180deg'}],
            alignSelf: 'flex-end',
            marginLeft: 30,
            //width: width * 0.03,
            //height: 60,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
}