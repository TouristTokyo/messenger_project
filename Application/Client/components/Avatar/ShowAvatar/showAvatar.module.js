import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles(props) {
    const { width, height } = useWindowDimensions();
    const { profile } = props;
    
    const containerWidth = profile ? 90 : 40;
    const imageWidth = profile ? containerWidth : 40;
    const imageHeight = profile ? containerWidth : 40;
    const nonePhotoWidth = profile ? containerWidth : 90;
    const nonePhotoHeight = profile ? containerWidth : 90;
  
    return StyleSheet.create({
      container: {
        flexDirection: "row",
      },
      image: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 100,
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
      info: {
        marginTop: 10,
        flexDirection: "column",
      },
      nickname: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 4
      },
      dateOfBirth: {
        fontSize: 14,
        color: "#999999",
      },
    });
  }
  