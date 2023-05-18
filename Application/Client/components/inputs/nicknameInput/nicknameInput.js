import { View, TextInput, useWindowDimensions } from "react-native-web";
import useStyles from "./nicknameInput.module";

export default function NicknameInput({ value, setValue, flex, ...data }) {
    const styles = useStyles();
    const { width, height } = useWindowDimensions();
    let inputMask;


    inputMask = {
        maxLength: 10,
    };

    const inputWidth = flex ? "20%" : width * 0.2;
    const inputHeight = flex ? 44 : height * 0.06;

    return (
        <View style={[styles.container, { width: inputWidth, height: inputHeight }]}>
            <TextInput
                {...data}
                {...inputMask}
                maxLength={10}
                placeholderTextColor="#7C858E"
                value={value}
                style={[styles.input, { paddingLeft: inputHeight * 0.5 }]}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    );
}
