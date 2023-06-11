import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableHighlight, Modal, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
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
import DataInput from '../components/inputs/textInput/textInput';
import { useFocusEffect } from '@react-navigation/native';
import { getProfileNickname } from '../context/AsyncStorageUtil';


export default function ChannelScreen({ navigation, route }) {
    const styles = useStyles();
    const { channelId } = route.params;
    const [showPopup, setShowPopup] = useState(false);
    const [inputText, setInputText] = useState({
        nickname: '',
    });
    const { width, height } = useWindowDimensions();
    const scaleChange = Math.min(width * 0.0006, height * 0.001);
    const { logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const { selectedImage } = useContext(ImageContext);
    const [isMember, setIsMember] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userText, setUserText] = useState('');
    const username = 'admin';
    const password = 'root';
    const [channelData, setChannelData] = useState([]);
    const [channelText, setChannelText] = useState('');
    const [shouldFetchChannelData, setShouldFetchChannelData] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const fetchChannelData = async () => {
        try {
            const response = await fetch(`https://linking-api.onrender.com/api/channels/${channelId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            if (response.ok) {

                const channelData = await response.json();
                const isCreator = user?.id === channelData.creator?.id;
                const member = channelData.members.find(member => member.user.id === user.id);
                const currentUser = channelData.members.find(member => member.user.id === user.id);

                if (currentUser) {
                    const { role } = currentUser;
                    if (role) {
                        if (role.admin !== undefined) {
                            setIsAdmin(role.admin);
                        }
                    }
                }
                setIsMember(member);
                setIsDisable(isCreator);
                setChannelData(channelData);
                setChannelText(channelData.channel.name);
                setIsLoading(false);
            } else {
            }
        } catch (error) {
            alert('Ошибка при подключении к серверу', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchProfileNickname();
            setShouldFetchChannelData(true);
        }, [])
    );

    useEffect(() => {
        if (shouldFetchChannelData) {
            fetchChannelData()
                .then(() => setShouldFetchChannelData(false))
                .catch((error) => alert('Не удалось подгрузить данные о канале', error));
        }
    }, [shouldFetchChannelData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShouldFetchChannelData(true);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleMessageSent = () => {
        setShouldFetchChannelData(true);
    };

    const fetchProfileNickname = async () => {
        try {
            const nickname = await getProfileNickname();
            if (nickname && nickname !== userText) {
                setUserText(nickname);
            }
        } catch (error) {
            console.log('Ошибка при подгрузке никнейма', error);
        }
    };

    const isFormValid = inputText.nickname;
    const handleLogout = () => {
        logout();
        window.location.reload();
    }
    const buttons = [
        {
            onPress: ({ }) => navigation.navigate('Profile'),
            text: 'Мой аккаунт',
        },
        {
            onPress: handleLogout,
            text: 'Выйти',
        },
    ];

    const handleJoinLeave = async () => {
        try {
            const name = userText || user.name;
            const channelName = channelText;
            const apiUrl = isMember
                ? `https://linking-api.onrender.com/api/channels/${channelId}/leave?username=${name}`
                : `https://linking-api.onrender.com/api/channels/join?username=${name}&channel_name=${channelName}`;

            const response = await fetch(apiUrl, {
                method: isMember ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            if (response.ok) {
                setIsMember((prevIsMember) => !prevIsMember);
                alert(isMember ? 'Вы покинули канал' : 'Вы присоединились к каналу');
                window.location.reload();
            } else {
                alert(isMember ? 'Не удалось покинуть канал' : 'Не удалось присоединиться к каналу');
            }
        } catch (error) {
            alert('Ошибка при подключении к серверу', error);
        }
    };



    const imageSource = selectedImage || (user && user.image);
    const handleCreateChannel = async () => {
        try {
            const response = await fetch('https://linking-api.onrender.com/api/channels/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    username: user.name,
                    channelName: inputText.nickname,
                }),
            });

            if (response.ok) {
                setShowPopup(false);
                alert('Канал создан');
                window.location.reload();
            } else {
                alert('Не удалось создать канал');
            }
        } catch (error) {
            alert('Ошибка при подключении к серверу:', error);
        }
    };

    return (
        <View style={styles.containerMain}>

            <View style={styles.profileContainer}>
                <ShowAvatar imageUrl={imageSource} profile={true} />
                <Text style={{ color: '#000000', fontSize: Math.min(width * 0.03, height * 0.055), textAlign: 'center', marginBottom: 13, fontFamily: 'Montserrat-Regular', }}>{user.name}</Text>
                {buttons.map((data, index) => (
                    <View style={{ width: '70%' }} key={index}>
                        <BorderButton key={index} data={data} />
                    </View>
                ))}
            </View>
            <View style={styles.historyContainer}>
                {isLoading && (
                    <View style={styles.barChanContainer}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color='rgba(0, 118, 185, 0.35)' />
                        </View>
                    </View>
                )}


                {!isLoading && (
                    <View style={styles.barChanContainer}>
                        <Text style={styles.barText}>{channelText}</Text>
                        <View>
                            <HeaderButton title={isMember ? 'Покинуть' : 'Присоединиться'} onPress={handleJoinLeave} disabled={isDisable} />
                        </View>
                        {isAdmin && isMember && (
                            <View style={{ marginRight: 20 }}>
                                <TouchableHighlight onPress={({ }) => navigation.navigate('Settings', { channelId: channelData.channel.id })}>
                                    <SettingsSvg style={{
                                        transform: `scale(${scaleChange})`,

                                    }} />
                                </TouchableHighlight>
                            </View>
                        )}
                    </View>
                )}
                {isLoading && (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color='rgba(0, 118, 185, 0.35)' />
                    </View>
                )}
                {!isLoading && (
                    <ScrollView
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
                )}
                {isMember && (
                    <View style={styles.sendContainer}>
                        <MessageInput channel={true} curuser={user.name} chanInf={channelData} onMessageSent={handleMessageSent} />
                    </View>
                )}
            </View>

            <View style={styles.bottomLeft}>
                <HeaderButton title='Создать канал' onPress={() => setShowPopup(true)}>
                </HeaderButton>
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
                    <TouchableHighlight onPress={() => setShowPopup(false)}>
                        <HeaderButton title={"Создать"} onPress={handleCreateChannel} disabled={!isFormValid} />
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}
