import React, { useState, useContext, useEffect } from 'react';
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

export default function ChannelScreen({ navigation }) {
    const styles = useStyles();
    const [showPopup, setShowPopup] = useState(false);
    const [role, setRole] = useState('Admin');
    const [inputText, setInputText] = useState({
        nickname: '',
    });
    const { logout } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const { selectedImage } = useContext(ImageContext);
    const [isMember, setIsMember] = useState(false);
    const [showSettings, setShowSettings] = useState(true);

    useEffect(() => {
        loadChatMessages();
      }, []);
    
      useEffect(() => {
        saveChatMessages();
      }, [messages]);
    

    useEffect(() => {
        loadChannelState();
    }, []);

    useEffect(() => {
        saveChannelState();
    }, [isMember, showSettings]);

    const handleSend = (message, role) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

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

    const messageBodies = [
        {
            imageUrl: 'https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg',
            nickname: 'John Doe',
            role: 'Avatar',
            channel: true,
            message: 'Hellffffffffffffffffffffffffffffffffffffffffffffffffffffffffo world!',
        },
        {
            own: true,
            nickname: 'John Doe',
            role: 'Amon',
            channel: true,
            message: 'Hellffffffffffffffffffffffffffffffffffffffffffffffffffffffffo world!',
        },
    ];

    const handleJoinLeave = () => {
        setIsMember((prev) => !prev);
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

    const loadChannelState = async () => {
        try {
            const savedChannelState = await AsyncStorage.getItem('channelState');
            if (savedChannelState) {
                const { isMember: savedIsMember, showSettings: savedShowSettings } = JSON.parse(savedChannelState);
                setIsMember(savedIsMember);
                setShowSettings(savedShowSettings);
            }
        } catch (error) {
            console.error('Error while loading channel state:', error);
        }
    };
    const saveChatMessages = async () => {
        try {
            await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
        } catch (error) {
            console.error('Error while saving chat messages:', error);
        }
    };

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
    return (
        <View style={styles.containerMain}>
            <View style={styles.barChanContainer}>
                <Text style={styles.barText}>Channels name</Text>
                <View>
                    <HeaderButton title={isMember ? 'Покинуть' : 'Присоединиться'} onPress={handleJoinLeave} />
                </View>
                {isMember && showSettings && (
                    <View style={{ marginRight: 20 }}>
                        <TouchableHighlight onPress={({ }) => navigation.navigate('Settings')}>
                            <SettingsSvg />
                        </TouchableHighlight>
                    </View>
                )}
            </View>
            <View style={styles.profileContainer}>
                <ShowAvatar imageUrl={selectedImage} profile={true} />
                <Text style={{ color: '#000000', fontSize: 48, textAlign: 'center', marginBottom: 13 }}>Username</Text>
                {buttons.map((data, index) => (
                    <View style={{ width: '70%' }} key={index}>
                        <BorderButton key={index} data={data} />
                    </View>
                ))}
            </View>
            <View style={styles.historyContainer}>
                <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                    {messageBodies.map((data, index) => (
                        <MessageBody key={index} data={data} />
                    ))}
                    {messages.map((message, index) => (
                        <MessageBody key={index} data={message} />
                    ))}
                </ScrollView>
            </View>
            {isMember && (
                <View style={styles.sendContainer}>
                    <MessageInput onSend={handleSend} role={role} />
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
                    <TouchableOpacity onPress={() => setShowPopup(false)}>
                        <View>
                            <HeaderButton title={'Создать'} onPress={() => console.log()} disabled={!isFormValid} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
