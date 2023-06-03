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
        rowContainer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        avatarContainer: {
          flexDirection: "row",
          alignItems: "center",
        },
        username: {
          fontFamily: "Montserrat-Regular",
          fontSize: Math.min(width * 0.012, height * 0.032),
          fontWeight: "bold",
          marginLeft: 8,
        },
        channelName: {
          fontFamily: "Montserrat-Regular",
          fontSize: Math.min(width * 0.012, height * 0.032),
          fontWeight: "bold",
        },
        deleteContainer: {
          marginLeft: "auto",
        },
      });
}
