import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GreetingsScreen from './screens/GreetingsScreen';
import MainUnauthScreen from './screens/MainUnauthScreen';
import AuthScreen from './screens/AuthScreen';
import RegScreen from './screens/RegScreen';
import ForgotScreen from './screens/ForgotScreen';
import HeaderLogoSvg from './assets/icons/headerLogoSvg';
import HeaderButton from './components/buttons/headerButton';
import { TouchableHighlight, View } from 'react-native-web';
import SearchInput from './components/inputs/searchInput/searchInput';
import MainAuthScreen from './screens/MainAuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChangeEmailScreen from './screens/ChangeEmailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ChatScreen from "./screens/ChatScreen";
import ChannelScreen from './screens/ChannelScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChannelUnauthScreen from './screens/ChannelUnauthScreen';
import { ImageProvider } from './context/ImageContext';
import { AuthProvider } from './context/AuthContext';
import {MessageProvider} from './context/MessageContext';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });
};

loadFonts()
  .then(() => {
    renderApp();
  })
  .catch((error) => {
    console.error('Error loading fonts:', error);
  });
export default function App( ) {
const Stack = createStackNavigator();
const [searchValue, setSearchValue] = useState('');
const [searchResults, setSearchResults] = useState([]);
const username = 'admin';
const password = 'root';
const [resultsUnauth, setResultsUnauth] = useState([]);
const [results, setResults] = useState([]);

useEffect(() => {
  document.title = 'Linking';
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const channelResponse = await fetch('https://linking-api.onrender.com/api/channels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (channelResponse.ok) {
        const channelData = await channelResponse.json();
        const formattedResults = [];
        const unauthResults = [];

        for (let i = 0; i < channelData.length; i++) {
          const channel = channelData[i];
          formattedResults.push({
            name: channel.name,
            onPress: ({ navigation }) =>
            navigation.navigate('Channel', { channelId: channel.channel.id }),
            avatarUrl: null
          });
          unauthResults.push({
            name: channel.name,
            onPress: ({ navigation }) =>
            navigation.navigate('ChannelUnauth', { channelId: channel.channel.id }),
            avatarUrl: null
          });
        }
        const userResponse = await fetch('https://linking-api.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          for (let i = 0; i < userData.length; i++) {
            const user = userData[i];
            formattedResults.push({
              name: user.name,
              onPress: ({ navigation }) =>
              navigation.navigate('Chat', { chatUser: user }),
              avatarUrl: user.image,
            });
          }
        } else {
          console.log('Failed to fetch user data');
        }

        setResults(formattedResults);
        setResultsUnauth(unauthResults);
      } else {
        console.log('Failed to fetch channel data');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


  


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

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={resultsUnauth}
            navigation={navigation}
            unauth={true}
            />
          <View style={{ paddingHorizontal: 193 }} />
          <HeaderButton
            style={{ marginLeft: 10 }}
            title={"Войти"}
            onPress={() => navigation.navigate('Auth')}
          />
        </View>

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
    name: 'ChannelUnauth',
    component: ChannelUnauthScreen,
    options: ({ navigation, route }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainUnauth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={resultsUnauth}
            unauth={true}
            navigation={navigation}
            />
            <View style={{ paddingHorizontal: 193 }} />
          <HeaderButton
            style={{ marginLeft: 10 }}
            title={"Войти"}
            onPress={() => navigation.navigate('Auth')}
          />
        </View>

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
    name: 'Settings',
    component: SettingsScreen,
    options: ({ navigation, route }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
              <View style={{ paddingHorizontal: 30 }} />
        </View>


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
    name: 'MainAuth',
    component: MainAuthScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
              <View style={{ paddingHorizontal: 30 }} />
        </View>

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
    name: 'Chat',
    component: ChatScreen,
    options: ({ navigation, route }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
              <View style={{ paddingHorizontal: 30 }} />
        </View>

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
    name: 'Channel',
    component: ChannelScreen,
    options: ({ navigation, route }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
              <View style={{ paddingHorizontal: 30 }} />
        </View>

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
    name: 'Profile',
    component: ProfileScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
          <View style={{ paddingHorizontal: 30 }} />
        </View>

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
    name: 'ChangePassword',
    component: ChangePasswordScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
              <View style={{ paddingHorizontal: 30 }} />
        </View>

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
    name: 'ChangeEmail',
    component: ChangeEmailScreen,
    options: ({ navigation }) => ({
      title: "",
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MainAuth')}>
          <HeaderLogoSvg style={{ marginLeft: 20 }} />
        </TouchableHighlight>
      ),
      headerRight: () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            />
              <View style={{ paddingHorizontal: 30 }} />
        </View>

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            unauth={true}
            />
          <View style={{ paddingHorizontal: 193 }} />
          <HeaderButton
            style={{ marginLeft: 10 }}
            title={"Войти"}
            onPress={() => navigation.navigate('Auth')}
          />
        </View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            unauth={true}
            />
          <View style={{ paddingHorizontal: 193 }} />
          <HeaderButton
            style={{ marginLeft: 10 }}
            title={"Войти"}
            onPress={() => navigation.navigate('Auth')}
          />
        </View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchInput style={{ marginRight: 10 }} value={searchValue}
            setValue={setSearchValue}
            results={results}
            navigation={navigation}
            unauth={true}
            />
          <View style={{ paddingHorizontal: 193 }} />
          <HeaderButton
            style={{ marginLeft: 10 }}
            title={"Войти"}
            onPress={() => navigation.navigate('Auth')}
          />
        </View>
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


  return (
    <ImageProvider>
    <AuthProvider >
      <MessageProvider>
      <NavigationContainer>
      
          <Stack.Navigator >
            {screens.map((screen) => (
              <Stack.Screen key={screen.name} {...screen} />
            ))}
          </Stack.Navigator>
       
      </NavigationContainer>
      </MessageProvider>
    </AuthProvider>
    </ImageProvider>

  );
}

