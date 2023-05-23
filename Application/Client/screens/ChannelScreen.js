import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView } from 'react-native';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import HeaderButton from '../components/buttons/headerButton';
import ShowAvatar from '../components/Avatar/ShowAvatar/showAvatar';
import BorderButton from '../components/buttons/borderButton';
import MessageBody from '../components/messageBody/messageBody';
import MessageInput from '../components/inputs/messageInput/messageInput';
import SettingsSvg from '../assets/icons/settingsSvg';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataInput from '../components/inputs/textInput/textInput';
import { useFocusEffect } from '@react-navigation/native';
import { setProfileNickname, getProfileNickname } from '../context/AsyncStorageUtil';
import axios from 'axios';

export default function ChannelScreen({ navigation, route }) {
    const styles = useStyles();
    const { channelId } = route.params;
    const [showPopup, setShowPopup] = useState(false);
    const [role, setRole] = useState('Admin');
    const [inputText, setInputText] = useState({
        nickname: '',
    });
    const { logout } = useContext(AuthContext);
    const { user, updateUser } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const { selectedImage } = useContext(ImageContext);
    const [isMember, setIsMember] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showSettings, setShowSettings] = useState(true);
    const [userText, setUserText] = useState('');
    const username = 'admin';
    const password = 'root';
    const [channelData, setChannelData] = useState([]);
    const [shouldUseFocusEffect, setShouldUseFocusEffect] = useState(false);

    useEffect(() => {
        setShouldUseFocusEffect(false); // Reset the flag
    }, [channelData.messages]);
    useFocusEffect(
        React.useCallback(() => {
            fetchProfileNickname();
            fetchChannelData();
        }, [channelData.messages])
    );

    const scrollViewRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        if (channelData?.messages?.length > 0 && isAtBottom) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [channelData?.messages, isAtBottom]);

    const handleContentSizeChange = () => {
        const isScrolledToBottom =
            scrollViewRef.current &&
            scrollViewRef.current.contentOffset &&
            scrollViewRef.current.contentOffset.y + scrollViewRef.current.layoutMeasurement.height >=
            scrollViewRef.current.contentSize.height;

        setIsAtBottom(isScrolledToBottom);
    };

    const fetchProfileNickname = async () => {
        try {
            const nickname = await getProfileNickname();
            if (nickname && nickname !== userText) {
                setUserText(nickname);
            }
        } catch (error) {
            console.log('Error retrieving profile nickname:', error);
        }
    };


    useEffect(() => {
        loadChatMessages();
        console.log(channelId);
    }, []);

    useEffect(() => {
        saveChatMessages();
    }, [messages]);

    useEffect(() => {
        saveChannelState();
    }, [isMember, showSettings]);



    const isFormValid = inputText.nickname;
    const buttons = [
        {
            onPress: ({ }) => navigation.navigate('Profile'),
            text: 'Мой аккаунт',
        },
        {
            onPress: () => logout(),
            text: 'Выйти',
        },
    ];



    const handleJoinLeave = async () => {
        try {
            const name = userText || user.name;
            const channelName = channelData.name;
            const apiUrl = isMember
                ? `http://localhost:8080/api/channels/${channelId}/leave?username=${name}`
                : `http://localhost:8080/api/channels/join?username=${name}&channel_name=${channelName}`;

            const response = await fetch(apiUrl, {
                method: isMember ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            if (response.ok) {
                setIsMember((prevIsMember) => !prevIsMember);
                alert(isMember ? 'You left the channel' : 'You joined the channel');
                window.location.reload();
            } else {
                // Handle error response
                alert(isMember ? 'Failed to leave the channel' : 'Failed to join the channel');
            }
        } catch (error) {
            alert('Error joining/leaving the channel:', error);
        }
    };



    const saveChannelState = async () => {
        try {
            const channelState = {
                isMember,
                showSettings,
            };
            await AsyncStorage.setItem('channelState', JSON.stringify(channelState));
        } catch (error) {
            console.error('Error while saving channel state:', error);
        }
    };


    const saveChatMessages = async () => {
        try {
            await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
        } catch (error) {
            console.error('Error while saving chat messages:', error);
        }
    };
    const imageSource = selectedImage || (user && user.image);
    const loadChatMessages = async () => {
        try {
            const savedMessages = await AsyncStorage.getItem('chatMessages');
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        } catch (error) {
            console.error('Error while loading chat messages:', error);
        }
    };
    const handleCreateChannel = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/channels/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    username: userText,
                    channelName: inputText.nickname,
                }),
            });

            if (response.ok) {
                const channelResponse = await response.json();
                setShowPopup(false);
                // Channel creation successful
                alert('Channel created');

                // Update user.channels in the AuthContext
                const updatedUser = {
                    ...user,
                    channels: [...user.channels, channelResponse],
                };

                // Store the updated user data in localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));

                // Update user data in the AuthContext
                updateUser(updatedUser);
            } else {
                // Handle error response
                alert('Failed to create channel');
            }
        } catch (error) {
            alert('Error creating channel:', error);
        }
    };

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

                // Check if the user is the channel creator
                const isCreator = user?.id === channelData.creator?.id;
                const member = user.channels?.some((channel) => channel.id === channelData.id);
                const currentUser = channelData.members.find(member => member.user.id === user.id);

                if (currentUser) {
                    // Access the role object of the current user
                    const { role } = currentUser;

                    if (role) {
                        // User has a role, handle it accordingly


                        if (role.isAdmin !== undefined) {
                            // User has an isAdmin property

                            setIsAdmin(role.isAdmin);
                        }
                    }
                } 
                // Update isMember and showSettings based on the condition
                setIsMember(member);

                setIsDisable(isCreator);
                setChannelData(channelData);
            } else {
                // Handle error response
                console.log('Failed to fetch channel data');
            }
        } catch (error) {
            console.log('Error fetching channel data:', error);
        }
    };


    return (
        <View style={styles.containerMain}>
            <View style={styles.barChanContainer}>
                <Text style={styles.barText}>{channelData.name}</Text>
                <View>
                    <HeaderButton title={isMember ? 'Покинуть' : 'Присоединиться'} onPress={handleJoinLeave} disabled={isDisable} />
                </View>
                {isMember && isAdmin && (
                    <View style={{ marginRight: 20 }}>
                        <TouchableHighlight onPress={({ }) => navigation.navigate('Settings', { channelId: channelData.id })}>
                            <SettingsSvg />
                        </TouchableHighlight>
                    </View>
                )}
            </View>
            <View style={styles.profileContainer}>
                <ShowAvatar imageUrl={imageSource} profile={true} />
                <Text style={{ color: '#000000', fontSize: 48, textAlign: 'center', marginBottom: 13, fontFamily: 'Montserrat-Regular', }}>{userText ? userText : user.name}</Text>
                {buttons.map((data, index) => (
                    <View style={{ width: '70%' }} key={index}>
                        <BorderButton key={index} data={data} />
                    </View>
                ))}
            </View>
            <View style={styles.historyContainer}>
                <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange}
                    style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                    {channelData?.messages?.map((message) => {
                        const senderId = message.sender?.id;
                        const matchingMember = channelData.members.find((member) => member.user.id === senderId);

                        const role = matchingMember?.role?.name;

                        return (
                            <MessageBody
                                key={message.id}
                                data={{
                                    imageUrl: message.sender?.image,
                                    nickname: message.sender?.name,
                                    role: role,
                                    message: message.data,
                                    date: message.date,
                                    own: message.sender?.name === user.name,
                                    channel: true,
                                    unauth: false,
                                    ident: message.id
                                }}
                                currentUser={user}
                            />
                        );
                    })}

                </ScrollView>
            </View>
            {isMember && (
                <View style={styles.sendContainer}>
                    <MessageInput channel = {true} curuser={userText ? userText : user.name} chanInf={channelData} />
                </View>
            )}
            <View style={styles.bottomLeft}>
                <TouchableHighlight onPress={() => setShowPopup(true)}>
                    <CreateSvg />
                </TouchableHighlight>
            </View>
            <Modal visible={showPopup} transparent={true}>
                <View style={styles.popupContainer}>
                    <Text style={styles.text}>Название канала</Text>
                    <View style={{ marginBottom: 13, alignItems: 'center' }}>
                        <DataInput
                            value={inputText.nickname}
                            setValue={(text) => setInputText({ ...inputText, nickname: text })}
                            placeholder={''}
                            type={'nickname'}
                            flex={true}
                        />
                    </View>
                    <View>
                        <HeaderButton title={"Создать"} onPress={handleCreateChannel} disabled={!isFormValid} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
