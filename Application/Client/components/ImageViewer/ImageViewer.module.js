import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    return StyleSheet.create({
        Avatarimage: { 
            width: 139,
            height: 139,
            borderRadius: 100,
        },
    });
}
