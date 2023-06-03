import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    return StyleSheet.create({
        container: {
            backgroundColor: "#FFFFFF",
            borderRadius: 26,
            paddingVertical: 12,
            paddingHorizontal: 16,
    
        },
        text: {
            fontFamily: 'Montserrat-Regular',
            color: '#000000',
            fontSize:Math.min(width * 0.012, height * 0.032),
            textAlign: 'center',
            marginBottom: 13
        },
        content: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1
        },
        username: {
            fontFamily: 'Montserrat-Regular',
            fontSize:Math.min(width * 0.012, height * 0.032),
            color: "#000000",
            marginLeft: 40,
        },
        role: {
            fontFamily: 'Montserrat-Regular',
            fontSize: Math.min(width * 0.012, height * 0.032),
            color: "#0076B9",
            marginLeft: 40,
            marginRight: 40
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
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
            top: '50%', 
            left: '50%', 
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }], 
            width: '30%',
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column', 
        },
    });
}
