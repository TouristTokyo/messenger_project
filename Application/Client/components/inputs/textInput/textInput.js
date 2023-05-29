import { View, TextInput } from "react-native-web";
import useStyles from "./textInput.module";



export default function DataInput({value, setValue, ...data}) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
              <TextInput 
                {...data}
                placeholderTextColor={"#7C858E"}
                value={value}
                style={[styles.input, { paddingLeft: 21 }]}
                onChangeText={text => setValue(text)}
              />
    </View>
  );
}