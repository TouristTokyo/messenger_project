import React, { useContext, useState } from "react";
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
import AuthContext from "../../context/AuthContext";
import axios from 'axios';


export default function SettingsBody({ data }) {
    const { role, name, onPress, containerStyle, creator, channelId } = data;
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { user } = useContext(AuthContext);
    const [inputText, setInputText] = useState({
        nickname: '',
        role: role, // add state for role input value
    });
    const [isAdmin, setIsAdmin] = useState(false); // add state for AdminSvg icon
    const username = 'admin';
    const password = 'root';
    const handleDelete = async () => {
        try {
          const url = `http://localhost:8080/api/channels/${channelId.id}/leave?username=${name}`;
          const response = await axios.delete(url, {
            auth: {
              username: username,
              password: password
            }
          });
          console.log('Delete request sent successfully');
          console.log(response.data); // Optional: Log the response data
        } catch (error) {
          console.error('Error sending delete request:', error);
        }
      };
      

    const isFormValid = inputText.role;


    const handleAdminClick = () => {
        setIsAdmin(!isAdmin); // toggle AdminSvg icon
    };

    const handleRoleChange = (role) => {
        setInputText({ ...inputText, role: role }); // update role input value
    };

    const handleSaveChanges = async () => {
        const url = 'http://localhost:8080/api/roles/create';
      
        const requestBody = {
          name: inputText.role,
          isAdmin: isAdmin,
          username: name,
          channelName: channelId.name
        };
      
        try {
            
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`${username}:${password}`)}` // Replace with your own username and password
            },
            body: JSON.stringify(requestBody)
          });
      
          // Check if the request was successful
          if (response.ok) {
            console.log('Role created successfully');
          } else {
            console.log('Failed to create role');
            console.log(channelId.name);
          }
        } catch (error) {
          console.error('Error creating role:', error);
        }
      
        setShowPopup(false);
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
                {!creator && (
                    <TouchableOpacity onPress={handleDelete}>
                        <DeleteSvg />
                    </TouchableOpacity>
                )}

                <Text style={styles.username}>{name}</Text>
                <Text style={styles.role}>{inputText.role}</Text>

                {!creator  && (
                    <TouchableOpacity onPress={() => setShowPopup(true)}>
                        <ChangeSvg />
                    </TouchableOpacity>
                )}
            </View>


            <Modal visible={showPopup} transparent={true}>
                <View style={styles.popupContainer}>
                    <Text style={styles.text}>Название роли</Text>
                    <View style={styles.inputContainer}>
                        <DataInput
                            value={inputText.role}
                            setValue={(text) => setInputText({ ...inputText, role: text })}
                            placeholder={""}
                            type={"nickname"}
                            flex={true}
                        />
                        <TouchableOpacity style={styles.adminButton} onPress={handleAdminClick}>
                            {isAdmin ? <AdminFocusSvg /> : <AdminSvg />}
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => setShowPopup(false)}>
                            <HeaderButton title={"Назначить"} onPress={handleSaveChanges} disabled={!isFormValid} />
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
