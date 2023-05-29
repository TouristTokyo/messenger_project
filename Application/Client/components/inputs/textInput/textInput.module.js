import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      
     
    },
    input: {
      flex: 1,
      height: 44,
      width: 600,
      fontSize: 16,
      paddingLeft: 40,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      color: "#000000",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)"
    },
  });
}
