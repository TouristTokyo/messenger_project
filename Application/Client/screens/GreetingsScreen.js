import React from 'react';
import { View} from 'react-native-web';
import LogoSvg from '../assets/icons/logoSvg';
import HeaderButton from '../components/buttons/headerButton';
import useStyles from './styles/greetingsScreen.module';

function GreetingsScreen({ navigation }) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.headerButton}>
        <HeaderButton
          title={"Начать"}
          onPress={() => navigation.navigate('MainUnauth')}
        />
      </View>
    </View>
  );
}

export default GreetingsScreen;
