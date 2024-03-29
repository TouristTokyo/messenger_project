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
      height: Math.min(width * 0.03, height * 0.055), 
      fontFamily: 'Montserrat-Regular',
      fontSize: Math.min(width * 0.03, height * 0.055), 
      paddingLeft: "5%",
      backgroundColor: "#FFFFFF",
      color: "#000000",
      width: "70%", 
    },
  });
}