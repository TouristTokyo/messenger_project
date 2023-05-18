import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native-web';



export default function BorderButton({ data }) {
    const {onPress, text} = data;
    
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 15,
    
    
  },
  text: {
    fontSize: 36,
    color: '#000000',
    textAlign: 'center',
  },
});