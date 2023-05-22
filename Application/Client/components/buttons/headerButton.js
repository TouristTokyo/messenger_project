import { View } from "react-native-web";
import useStyles from "./headerButton.module";

import { Text, TouchableHighlight} from 'react-native-web';


export default function HeaderButton({title, onPress, disabled}) {
  const styles = useStyles(disabled);
 
  return (
    <TouchableHighlight style={styles.button} onPress={onPress} disabled={disabled}>
      
        <Text style={styles.buttonText}>{title}</Text>
      
    </TouchableHighlight>
  );
} 