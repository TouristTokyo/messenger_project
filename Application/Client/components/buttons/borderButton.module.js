import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    return StyleSheet.create({
        button: {
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#000000',
          paddingHorizontal: 10,
          paddingVertical: 15,
          width: width * 0.15,
          paddingHorizontal: 15,
          height: height * 0.09
          
        },
        text: {
          fontFamily: 'Montserrat-Regular',
          fontSize: Math.min(width * 0.02, height * 0.045),
          color: '#000000',
          textAlign: 'center',
        },
      });
}