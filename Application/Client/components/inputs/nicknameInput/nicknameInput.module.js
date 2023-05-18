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
      fontSize: 48,
      paddingLeft: "5%", // Adjust the padding to your liking
      backgroundColor: "#FFFFFF",
      color: "#000000",
      width: "70%", // Adjust the width to your liking
    },
  });
}