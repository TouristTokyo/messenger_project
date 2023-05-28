import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      zIndex: 0,
      width: '90%'
    },
    icon: {
      position: "absolute",
      left: 10,
      zIndex: 1,
      transform: [{ scale: 0.5 }]
    },
    dismissIcon: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: -17 }],
      zIndex: 2,
    },
    dropdown: {
      position: "absolute",
      top: 50,
      left: 0,
      right: 0,
      flex: 1,
      maxHeight: 300, 
      overflowY: "auto", 
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
      zIndex: 1,
      padding: 10,
    },
    input: {
      flex: 1,
      fontFamily: 'Montserrat-Regular',
      height: 44,
      width: 600,
      fontSize: 20,                 
      paddingLeft: 10,
      paddingRight: 10,             
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      color: "#000000",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)"
    },
  });
}
