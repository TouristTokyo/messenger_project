import { StyleSheet, useWindowDimensions } from 'react-native';

export default function useStyles(disabled) {
  const buttonWidth = width * 0.1;
  const { width, height } = useWindowDimensions();
  const buttonColor = disabled ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 118, 185, 0.35)';

  return StyleSheet.create({
    button: {
      backgroundColor: buttonColor,
      borderRadius: 14,
      minWidth: buttonWidth,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignSelf: 'right',
      marginVertical: 10,
      marginRight: 20,
      flex: 1
    },
    buttonText: {
      fontFamily: 'Montserrat-Regular',
      color: '#000000',
      fontSize: Math.min(width * 0.015, height * 0.05),
      textAlign: 'center',
    },
  });
}