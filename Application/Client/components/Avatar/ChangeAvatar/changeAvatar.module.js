import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    const nonePhotoWidth = width* 0.0845;
    const nonePhotoHeight =  width* 0.0845;
    
    return StyleSheet.create({
        container: { 
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },
        hovered: {
          opacity: 0.3,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        round: {
            padding: 5,
            borderRadius: 100,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#0076B9',
          },
          image: {
            width: nonePhotoWidth,
            height: nonePhotoHeight,
            borderRadius: 100,
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
