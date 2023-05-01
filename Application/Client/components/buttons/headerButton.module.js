import { StyleSheet, Dimensions } from 'react-native';

export default function useStyles() {
  const { width } = Dimensions.get('window');
  const buttonWidth = width * 0.1;

  return StyleSheet.create({
    button: {
      backgroundColor: 'rgba(0, 118, 185, 0.35)',
      borderRadius: 14,
      minWidth: buttonWidth,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignSelf: 'right',
      marginVertical: 10,
      marginRight: 20,
    },
    buttonText: {
      color: '#000000',
      fontSize: 24,
      textAlign: 'center',
    },
  });
}
