import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native-web';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/greetingsScreen.module';
import SearchInput from '../components/inputs/searchInput/searchInput';
import HeaderButton from '../components/buttons/headerButton';

export default function MainUnauthScreen({ navigation }) {
  const styles = useStyles();
   

  return (
    <View style={styles.containerMain}>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>Зарегистрируйтесь, чтобы начать общаться</Text>
      </View>
      <View style={styles.bottomLeft}>
      <HeaderButton title = 'Создать канал' onPress={() => navigation.navigate('Auth')}> 
        </HeaderButton>
      </View>
    </View>
  );
}