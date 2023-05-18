import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native-web";
import useStyles from "./searchInput.modules";
import SearchSvg from "../../../assets/icons/searchSvg";
import CrossSvg from "../../../assets/icons/crossSvg";
import SearchBody from "../../searchBodies/searchBody";

export default function SearchInput({ value, setValue, navigation, unauth, ...data }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    },
  ];

  const results = [
    {
      name: 'Rock Bottom',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Upper',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Under',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock W',
      onPress: () => navigation.navigate('Chat'),
    },
    {
      name: 'Rock Bottom',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Upper',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Under',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock W',
      onPress: () => navigation.navigate('Chat'),
    }, {
      name: 'Rock Bottom',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Upper',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      name: 'Rock Under',
      onPress: () => navigation.navigate('Channel'),
    },
    {
      avatar: { uri: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg' },
      name: 'Rock W',
      onPress: () => navigation.navigate('Chat'),
    },
  ];

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
                avatarUrl: result.avatar || null,
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