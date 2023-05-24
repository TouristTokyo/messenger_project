import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native-web';
import useStyles from './borderButton.module';

export default function BorderButton({ data }) {
    const {onPress, text} = data;
    const styles = useStyles();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}
