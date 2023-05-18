import React, { useState } from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native-web';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import SearchInput from '../components/inputs/searchInput/searchInput';
import HeaderButton from '../components/buttons/headerButton';
import BackSvg from '../assets/icons/backSvg';
import SettingsBody from '../components/settingsBody/settingsBody';
import DataInput from '../components/inputs/textInput/textInput';
import AddSvg from '../assets/icons/addSvg';

export default function SettingsScreen({ navigation }) {
    const styles = useStyles();
    const [isAdmin, setIsAdmin] = useState(false);
    const role = 'Amoniac';
    const handleRoleChange = (role) => {
        setInputText({ ...inputText, role: role });
        onRoleChange(role);
    };
    const [inputText, setInputText] = useState({
        nickname: 'Default Nickname',
    });
    const [isEditingNickname, setIsEditingNickname] = useState(false);
   
    const handleAddButtonClick = () => {
        if (isEditingNickname) {
            // Save changes and exit edit mode
            setIsEditingNickname(false);
           
        } else {
            // Enter edit mode
            setIsEditingNickname(true);
           
        }
    };

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
                    <SettingsBody role={role} username={"John Doe"} onRoleChange={handleRoleChange} />
                    <SettingsBody role={role} username={"John Doe"} onRoleChange={handleRoleChange} />
                    <SettingsBody role={role} username={"John Doe"} onRoleChange={handleRoleChange} />
                    <SettingsBody role={role} username={"John Doe"} onRoleChange={handleRoleChange} />
                    <SettingsBody role={role} username={"John Doe"} onRoleChange={handleRoleChange} />
                </ScrollView>
            </View>
            <View style={styles.topLeft}>
                <TouchableHighlight onPress={() => navigation.navigate('Channel')}>
                    <BackSvg />
                </TouchableHighlight>
            </View>
            <View style={styles.bottomLeft}>
                <HeaderButton title={'Удалить канал'} onPress={() => console.log("Delete")} disabled={!isAdmin} />
            </View>
        </View>
    );
}
