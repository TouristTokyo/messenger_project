import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GreetingsScreen from './screens/GreetingsScreen';
import MainUnauthScreen from './screens/MainUnauthScreen';
import AuthScreen from './screens/AuthScreen';
import RegScreen from './screens/RegScreen';
import ForgotScreen from './screens/ForgotScreen';
import HeaderLogoSvg from './assets/icons/headerLogoSvg';
import HeaderButton from './components/buttons/headerButton';
import { Button, TouchableHighlight } from 'react-native-web';
import SearchInput from './components/inputs/searchInput/searchInput';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Greetings',
    component: GreetingsScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainUnauth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (
        <HeaderButton
          style={{ marginRight: 20 }}
          title={"Войти"}
          onPress={() => navigation.navigate('Auth')}
        />
      ),
      headerShadowVisible: true,
      headerStyle: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20
      },
    }),
  },
  {
    name: 'MainUnauth',
    component: MainUnauthScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainUnauth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (
       
        <HeaderButton
          style={{ marginRight: 20 }}
          title={"Войти"}
          onPress={() => navigation.navigate('Auth')}
        />
    
      ),
      headerShadowVisible: true,
      headerStyle: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20
      },
    }),
  },
  {
    name: 'Auth',
    component: AuthScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainUnauth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (
        <HeaderButton
          style={{ marginRight: 20 }}
          title={"Войти"}
          onPress={() => navigation.navigate('Auth')}
        />
      ),
      headerShadowVisible: true,
      headerStyle: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20
      },
    }),
  },
  {
    name: 'Reg',
    component: RegScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainUnauth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (
        <HeaderButton
          style={{ marginRight: 20 }}
          title={"Войти"}
          onPress={() => navigation.navigate('Auth')}
        />
      ),
      headerShadowVisible: true,
      headerStyle: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20
      },
    }),
  },
  {
    name: 'Forgot',
    component: ForgotScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainUnauth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (
        <HeaderButton
          style={{ marginRight: 20 }}
          title={"Войти"}
          onPress={() => navigation.navigate('Auth')}
        />
      ),
      headerShadowVisible: true,
      headerStyle: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20
      },
    }),
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {screens.map((screen) => (
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

