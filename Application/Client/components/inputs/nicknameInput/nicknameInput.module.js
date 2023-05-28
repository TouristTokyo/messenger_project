import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
    input: {
      flex: 1,
      height: 60,
      fontFamily: 'Montserrat-Regular',
      fontSize: 48,
      paddingLeft: "5%",
      backgroundColor: "#FFFFFF",
      color: "#000000",
      width: "70%", 
    },
  });
}