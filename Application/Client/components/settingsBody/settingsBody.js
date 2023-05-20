import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native-web";
import ChangeSvg from "../../assets/icons/changeSvg";
import DeleteSvg from "../../assets/icons/deleteSvg";
import AdminSvg from "../../assets/icons/adminSvg";
import AdminFocusSvg from "../../assets/icons/adminFocusSvg";
import HeaderButton from "../buttons/headerButton";
import DataInput from "../inputs/textInput/textInput";

export default function SettingsBody({ role, username, onPress, containerStyle }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [inputText, setInputText] = useState({
        nickname: '',
        role: role, // add state for role input value
    });
    const [isAdmin, setIsAdmin] = useState(false); // add state for AdminSvg icon

    const handleDelete = () => {
        setShowPopup(false);
    };

    const isFormValid = inputText.role;

    const handleAdminClick = () => {
        setIsAdmin(!isAdmin); // toggle AdminSvg icon
    };

    const handleRoleChange = (role) => {
        setInputText({ ...inputText, role: role }); // update role input value
    };

    const handleSaveChanges = () => {
        // code to save changes goes here
        onPress(inputText.role);
        // hide modal
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                containerStyle,
                isHovered && { backgroundColor: "#E7DEDE" },
            ]}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <View style={styles.content}>
                <TouchableOpacity onPress={handleDelete}>
                    <DeleteSvg />
                </TouchableOpacity>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.role}>{inputText.role}</Text>
                <TouchableOpacity onPress={() => setShowPopup(true)}>
                    <ChangeSvg />
                </TouchableOpacity>
            </View>

            <Modal visible={showPopup} transparent={true}>
                <View style={styles.popupContainer}>
                    <Text style={styles.text}>Название роли</Text>
                    <View style={styles.inputContainer}>
                        <DataInput
                            value={inputText.role}
                            setValue={handleRoleChange}
                            placeholder={""}
                            type={"nickname"}
                            flex={true}
                        />
                        <TouchableOpacity style={styles.adminButton} onPress={handleAdminClick}>
                            {isAdmin ? <AdminFocusSvg /> : <AdminSvg />}
                        </TouchableOpacity>
                    </View>
                        <View >
                            <TouchableOpacity  onPress={() => setShowPopup(false)}>
                            <HeaderButton title={"Назначить"}  onPress={() => setShowPopup(false)} disabled={!isFormValid} />
                            </TouchableOpacity>
                        </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 26,
        paddingVertical: 12,
        paddingHorizontal: 16,
        
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        color: '#000000',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 13
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1
    },
    username: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 24,
        color: "#000000",
        marginLeft: 40,
    },
    role: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 24,
        color: "#0076B9",
        marginLeft: 40,
       marginRight: 40
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    popupContainer: {
        backgroundColor: '#E7DEDE',
        borderRadius: 35,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        position: 'absolute',
        top: '50%', // set top to 50%
        left: '50%', // set left to 50%
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }], // adjust position based on element size
        width: '30%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // add this line to make items centered in a column
    },
});
