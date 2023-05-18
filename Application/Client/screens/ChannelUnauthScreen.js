import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native-web';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';

import HeaderButton from '../components/buttons/headerButton';

import MessageBody from '../components/messageBody/messageBody';
import AuthContext from '../context/AuthContext';


export default function ChannelUnauthScreen({ navigation }) {
    const styles = useStyles();
    
    const messageBodies = [
        {
            imageUrl: "https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg",
            nickname: "John Doe",
            channel: false,
            message: "Hellffffffffffffffffffffffffffffffffffffffffffffffffffffffffo world!",
        },
        {
            own: true,
            nickname: "John Doe",
            channel: false,
            message: "Hellffffffffffffffffffffffffffffffffffffffffffffffffffffffffo world!",
        }
    ]


    return (
        <View style={styles.containerMain}>
            <View style={styles.barChanContainer}>
                <Text style={styles.barText}>Channels name</Text>
                <View>
                    <HeaderButton title={'Присоединиться'} onPress={() => navigation.navigate('Auth')} />
                </View>
            </View >
            <View style={styles.historyContainer}>
                <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                {messageBodies.map((data, index) =>
                        <MessageBody key={index} data={data} />
                    )}
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
