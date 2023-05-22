import { StyleSheet, useWindowDimensions } from "react-native-web";

export default function useStyles() {
    const { width, height } = useWindowDimensions();
    return StyleSheet.create({
        container: { 
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },
        round: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 155,
            width: 155,
            borderWidth: 0.7,
            borderRadius: 100,
            borderColor: '#0000FF',
        },
        nonePhoto: {
            height: 139, 
            width: 139, 
            backgroundColor: '#D9D9D9', 
            borderRadius: 100, 
            justifyContent: 'center', 
            alignItems: 'center',
        }
    });
}
