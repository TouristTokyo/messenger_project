import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    const nonePhotoWidth = width* 0.0845;
    const nonePhotoHeight =  width* 0.0845;
    return StyleSheet.create({
        Avatarimage: { 
            width: nonePhotoWidth,
            height: nonePhotoHeight,
            borderRadius: 100,
        },
    });
}
