import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native-web';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import { useFocusEffect } from '@react-navigation/native';
import HeaderButton from '../components/buttons/headerButton';

import MessageBody from '../components/messageBody/messageBody';
import AuthContext from '../context/AuthContext';


export default function ChannelUnauthScreen({ navigation, route }) {
    const styles = useStyles();
    const { channelId } = route.params;
    const [shouldUseFocusEffect, setShouldUseFocusEffect] = useState(false);
    
    useEffect(() => {
        setShouldUseFocusEffect(false);
    }, [channelId]);
    useFocusEffect(
        React.useCallback(() => {
            fetchChannelData();
        }, [channelId])
    );
    const username = 'admin';
    const password = 'root';
    const [channelData, setChannelData] = useState([]);

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
    const [channelText, setChannelText] = useState('');
    const fetchChannelData = async () => {
        try {
            const response = await fetch(`https://backend-web-service-test.onrender.com/api/channels/${channelId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            if (response.ok) {
                const channelData = await response.json();

                setChannelData(channelData);
                setChannelText(channelData.channel.name)
            } else {
                alert('Не удалось получить данные о канале, возможно он больше не существует');
            }
        } catch (error) {
            alert('Ошибка при подключении к серверу:', error);
        }
    };

    if (!channelData) {
        return null; 
      }
    return (
        <View style={styles.containerMain}>
            <View style={styles.barChanContainer}>
                <Text style={styles.barText}>{channelText}</Text>
                <View>
                    <HeaderButton title={'Присоединиться'} onPress={() => navigation.navigate('Auth')} />
                </View>
            </View >
            <View style={styles.historyContainer}>
                <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
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
                                    own: false,
                                    channel: true,
                                    unauth: true
                                }}
                              
                            />
                        );
                    })}
                </ScrollView>

            </View>
            <View style = {styles.bottomLeft}>
             <TouchableHighlight onPress={() => navigation.navigate('Auth')}>
          <CreateSvg />
        </TouchableHighlight>
        </View>
        </View>
    );
}
