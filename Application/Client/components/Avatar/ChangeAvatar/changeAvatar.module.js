import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    const nonePhotoWidth = width* 0.08;
    const nonePhotoHeight =  width* 0.08;


    return StyleSheet.create({
        container: { 
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },
        round: {
            padding: 5,
            borderRadius: 100,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#0076B9',
          },
          nonePhoto: {
            height: nonePhotoHeight,
            width: nonePhotoWidth,
            backgroundColor: "#D9D9D9",
            borderRadius: 100, 
            justifyContent: "center",
            alignItems: "center",
          },
    });
}
