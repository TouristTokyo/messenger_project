import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
    },
    input: {
      flex: 1,
      fontFamily: 'Montserrat-Regular',
      height: Math.min(width * 0.03, height * 0.055), 
      fontSize: Math.min(width * 0.01, height * 0.03),
      paddingLeft: 40,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      color: "#000000",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
      width: "80%", 
    },
  });
}

