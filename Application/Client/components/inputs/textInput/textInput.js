import { View, TextInput } from "react-native-web";
import useStyles from "./textInput.module";

export default function DataInput({ value, setValue, type, flex, ...data }) {
  const styles = useStyles();

  let inputMask;
  switch (type) {
    case "password":
      inputMask = {
        secureTextEntry: true,
        autoCompleteType: "password",
        maxLength: 26,
      };
      break;
    case "nickname":
      inputMask = {
        maxLength: 10,
      };
      break;
    case "email":
      inputMask = {
        autoCompleteType: "email",
        keyboardType: "email-address",
        maxLength: 55,
      };
      break;
    case "code":
      inputMask = {
        keyboardType: "number-pad",
        maxLength: 4,
      };
      break;
    default:
      inputMask = {};
  }

  const inputWidth = flex ? "90%" : 600;
  const inputHeight = flex ? 44 : 44;

  return (
    <View style={[styles.container, { width: inputWidth, height: inputHeight }]}>
      <TextInput
        {...data}
        {...inputMask}
        placeholderTextColor={"#7C858E"}
        value={value}
        style={[styles.input, { paddingLeft: 21 }]}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
}
