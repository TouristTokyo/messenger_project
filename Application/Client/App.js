import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GreetingsScreen from './screens/GreetingsScreen';
import MainUnauthScreen from './screens/MainUnauthScreen';
import AuthScreen from './screens/AuthScreen';
import RegScreen from './screens/RegScreen';
import ForgotScreen from './screens/ForgotScreen';
import HeaderLogoSvg from './assets/icons/headerLogoSvg';
import HeaderButton from './components/buttons/headerButton';
import { Button, TouchableHighlight, View } from 'react-native-web';
import SearchInput from './components/inputs/searchInput/searchInput';
import SearchBody from './components/searchBodies/searchBody';
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


export default function App( ) {
const Stack = createStackNavigator();
const [searchValue, setSearchValue] = useState('');
const [searchResults, setSearchResults] = useState([]);
const resultsUnauth = [
  {
    
    name: 'Rock Bottom',
    onPress: () => navigation.navigate('ChannelUnauth'),
  },
  {
    
    name: 'Rock Upper',
    onPress: () => navigation.navigate('ChannelUnauth'),
  },
  {
    name: 'Rock Under',
    onPress: () => navigation.navigate('ChannelUnauth'),
  },]
  const results = [
    {
      
      name: 'Rock Bottom',
      onPress: ({ navigation }) => navigation.navigate('Channel'),
    },
    {
      
      name: 'Rock Upper',
      onPress: ({ navigation }) => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Under',
      onPress: ({ navigation }) => navigation.navigate('Channel'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock W',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock A',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock s',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock j',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock b',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock m',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Mama',
      onPress: ({ navigation }) => navigation.navigate('Chat'),
    },

  ];
  


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
    <AuthProvider >
      <MessageProvider>
      <NavigationContainer>
        <ImageProvider>
          <Stack.Navigator >
            {screens.map((screen) => (
              <Stack.Screen key={screen.name} {...screen} />
            ))}
          </Stack.Navigator>
        </ImageProvider>
      </NavigationContainer>
      </MessageProvider>
    </AuthProvider>

  );
}

