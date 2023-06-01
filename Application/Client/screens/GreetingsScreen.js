import { View} from 'react-native-web';
import LogoSvg from '../assets/icons/logoSvg';
import HeaderButton from '../components/buttons/headerButton';
import useStyles from './styles/greetingsScreen.module';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

function GreetingsScreen({ navigation }) {
  const styles = useStyles();
  const { isLoggedIn, getCurrentScreen } = useContext(AuthContext);

  useEffect(() => {
    const fetchCurrentScreen = async () => {
      if (isLoggedIn) {
        const screenName = await getCurrentScreen();
        navigation.navigate(screenName);
      }
    };

    fetchCurrentScreen();
  }, [isLoggedIn, getCurrentScreen, navigation]);
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
