import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import SearchInput from '../components/inputs/searchInput/searchInput';
import HeaderButton from '../components/buttons/headerButton';
import BackSvg from '../assets/icons/backSvg';
import SettingsBody from '../components/settingsBody/settingsBody';
import DataInput from '../components/inputs/textInput/textInput';
import AddSvg from '../assets/icons/addSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';



export default function SettingsScreen({ navigation, route }) {
  const { channelId } = route.params;
  const { user } = useContext(AuthContext);
  const styles = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState('');
  
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [channelData, setChannelData] = useState([]);
  const username = 'admin';
  const password = 'root';

  useFocusEffect(
    React.useCallback(() => {
      fetchChannelData();
    }, [channelData.members])
  );
  const [inputText, setInputText] = useState({
    nickname: channelData.name || 'a',
  });
  const fetchChannelData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/channels/${channelId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
  
      if (response.ok) {
        const channelData = await response.json();
        
        setChannelData(channelData);
        setInputText((prevInputText) => ({
          ...prevInputText,
          nickname: channelData.name || 'a',
        }));
        const isCreator = user?.id === channelData.creator?.id;
        setIsAdmin(isCreator);
      } else {
        console.log('Failed to fetch channel data');
      }
    } catch (error) {
      console.log('Error fetching channel data:', error);
    }
  };

  
  
  const handleDeleteChannel = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/channels/delete/${channelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
  
      if (response.ok) {
        // Channel deletion successful
        alert('Channel deleted');
        navigation.navigate('MainAuth'); // Redirect to MainAuthScreen
      } else {
        // Handle error response
        alert('Failed to delete channel');
      }
    } catch (error) {
      alert('Error deleting channel:', error);
    }
  };
  

  const handleRoleChange = async (newRole) => {
    setRole(newRole);
    try {
      await AsyncStorage.setItem('role', newRole);
    } catch (error) {
      console.log('Error saving role:', error);
    }
  };

  const handleAddButtonClick = async () => {
    if (isEditingNickname) {
      // Save changes and exit edit mode
      setIsEditingNickname(false);
      try {
        // Make the API request to update the nickname
        const response = await fetch(`http://localhost:8080/api/channels/${channelId}/update?name=${encodeURIComponent(inputText.nickname)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          },
        });
  
        if (response.ok) {
          const channelResponse = await response.json();

        // Update user.channels in the AuthContext
        const updatedChannels = user.channels.map((channel) => {
          if (channel.id === channelResponse.id) {
            // Update the channel name
            return { ...channel, name: channelResponse.name };
          }
          return channel;
        });

        const updatedUser = {
          ...user,
          channels: updatedChannels,
        };

        // Store the updated user data in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        } else {
          console.log('Failed to update Channel name');
        }
      } catch (error) {
        console.log('Error updating Channel name:', error);
      }
    } else {
      // Enter edit mode
      setIsEditingNickname(true);
    }
  };
  

  const members = [
    {
      role: role,
      username: "John Doe",
      onRoleChange: handleRoleChange
    }
  ];

  return (
    <View style={styles.containerSettings}>
      <View style={styles.channNameContainer}>
        <View style={styles.dataInputContainer}>
          <DataInput
            value={inputText.nickname}
            setValue={(text) => setInputText({ ...inputText, nickname: text })}
            placeholder={""}
            type={"nickname"}
            flex={false}
            editable={isEditingNickname}
          />
        </View>
        <TouchableHighlight onPress={handleAddButtonClick}>
          <AddSvg />
        </TouchableHighlight>
      </View>
      <View style={styles.settingsContainer}>
        <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
        {channelData.members?.map((channel) => (
            <SettingsBody
             
              data={{
                key: channel.id,
                name: channel.user.name,
                role: channel.role.name,
                onRoleChange: handleRoleChange,
                creator: channel.role.isCreator,
                channelId: channelData
              }}
              
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.topLeft}>
        <TouchableHighlight onPress={() => navigation.navigate('Channel', { channelId: channelData.id })}>
          <BackSvg />
        </TouchableHighlight>
      </View>
      <View style={styles.bottomLeft}>
        <HeaderButton title={'Удалить канал'} onPress={handleDeleteChannel} disabled={!isAdmin} />
      </View>
    </View>
  );
}
