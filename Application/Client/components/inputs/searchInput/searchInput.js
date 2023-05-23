import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native-web";
import useStyles from "./searchInput.modules";
import SearchSvg from "../../../assets/icons/searchSvg";
import CrossSvg from "../../../assets/icons/crossSvg";
import SearchBody from "../../searchBodies/searchBody";
import { useNavigation } from '@react-navigation/native';

export default function SearchInput({ value, setValue, navigation, unauth, ...data }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigationt = useNavigation();

  const handlePress = (channelId) => {
    navigationt.navigate('Channel', { channelId });
  };

  const handlePressChat = (chatUser) => {
    navigationt.navigate('Chat', { chatUser});
  };

  const handlePressUnauth = (channelId) => {
    navigationt.navigate('ChannelUnauth', { channelId });
  };

  const styles = useStyles();

  const handleFocus = () => {
    setIsFocused(true);
    setIsDropdownVisible(true);
  };

  
  const handleCrossSvgPress = () => {
    setValue("");
    setIsFocused(false);
    setIsDropdownVisible(false);
  };


  const username = 'admin';
  const password = 'root';
  const [results, setResults] = useState([]);
  const [resultsUnauth, setResultsUnauth] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch channel data
        const channelResponse = await fetch('http://localhost:8080/api/channels', {
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
  
            // Add channel object to the formattedResults array
            formattedResults.push({
              name: channel.name,
              onPress: () => handlePress(channel.id),
              avatarUrl: null
            });
  
            // Add channel object to the unauthResults array
            unauthResults.push({
              name: channel.name,
              onPress: () => handlePressUnauth(channel.id),
              avatarUrl: null
            });
          }
  
          // Fetch user data
          const userResponse = await fetch('http://localhost:8080/api/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
          });
  
          if (userResponse.ok) {
            const userData = await userResponse.json();
  
            // Merge user data into formattedResults array
            for (let i = 0; i < userData.length; i++) {
              const user = userData[i];
  
              formattedResults.push({
                name: user.name,
                onPress: () => handlePressChat(user),
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
  
  const filteredResults = value
    ? (unauth ? resultsUnauth : results).filter((result) =>
        result.name.toLowerCase().includes(value.toLowerCase())
      )
    : (unauth ? resultsUnauth : results);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SearchSvg />
      </View>
      <TextInput
        {...data}
        placeholderTextColor="#7C858E"
        value={value}
        style={[styles.input, { paddingLeft: 36 }]}
        onFocus={handleFocus}
       
        onChangeText={(text) => setValue(text)}
      />
      {isFocused && (
        <TouchableOpacity onPressIn={handleCrossSvgPress}>
          <CrossSvg style={styles.dismissIcon}  />
        </TouchableOpacity>
      )}
      {isDropdownVisible && (
        <ScrollView style={styles.dropdown}>
          {filteredResults.map((result, index) => (
            <SearchBody
              key={index}
              data={{
                avatarUrl: result.avatarUrl,
                username: result.name,
                onPress: result.onPress,
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}