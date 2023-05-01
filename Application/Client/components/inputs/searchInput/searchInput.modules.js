import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 10,
      height: 44,
      shadowColor: "rgba(0, 0, 0, 1)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 2,
      shadowRadius: 0,
      elevation: 5,
    },
    icon: {
      position: "absolute",
      left: 10,
      zIndex: 1,
    },
    dismissIcon: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: -27 }]
    },
    currencySymbol: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: -10 }]
  },
    input: {
      flex: 1,
      borderRadius: 10,
      height: 44,
      fontSize: 16,
      backgroundColor: "#F9F9F9",
      color: "#000000",
      paddingLeft: 16,
    },
  });
}
