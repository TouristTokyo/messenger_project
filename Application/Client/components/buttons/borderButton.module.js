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
          
          
        },
        text: {
          fontFamily: 'Montserrat-Regular',
          fontSize: 36,
          color: '#000000',
          textAlign: 'center',
        },
      });
}