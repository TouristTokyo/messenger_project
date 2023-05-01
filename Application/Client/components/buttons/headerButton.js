import { View } from "react-native";
import useStyles from "./headerButton.module";

import { Text, TouchableHighlight} from 'react-native-web';


export default function HeaderButton({title, onPress}) {
  const styles = useStyles();
 
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      
        <Text style={styles.buttonText}>{title}</Text>
      
    </TouchableHighlight>
  );
}