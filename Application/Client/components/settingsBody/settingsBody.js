import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
} from "react-native-web";
import ChangeSvg from "../../assets/icons/changeSvg";
import DeleteSvg from "../../assets/icons/deleteSvg";
import AdminSvg from "../../assets/icons/adminSvg";
import AdminFocusSvg from "../../assets/icons/adminFocusSvg";
import HeaderButton from "../buttons/headerButton";
import DataInput from "../inputs/textInput/textInput";
import axios from 'axios';
import useStyles from "./settingsBody.module";
import AuthContext from "../../context/AuthContext";


export default function SettingsBody({ data }) {
    const { role, name, onPress, containerStyle, creator, channelId, admin } = data;
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [inputText, setInputText] = useState({
        nickname: '',
        role: role, 
    });
    const styles = useStyles();
    const [isAdmin, setIsAdmin] = useState(false); 
    const username = 'admin';
    const password = 'root';
    const isFormValid = inputText.role;
    const {user} = useContext(AuthContext);

    const handleDelete = async () => {
      if (user.name == name || admin && !creator){
        alert('Ошибка при попытки удаления пользователя:');
      }else{
        try {
          const url = `https://linking-api.onrender.com/api/channels/${channelId.channel.id}/leave?username=${name}`;
          const response = await axios.delete(url, {
            auth: {
              username: username,
              password: password
            }
          });
        } catch (error) {
          alert('Ошибка при попытки удаления пользователя:', error);
        }
      }
      };

    const handleAdminClick = () => {
        setIsAdmin(!isAdmin);
    };

    const handleSaveChanges = async () => {
        const url = 'https://linking-api.onrender.com/api/roles/update';
      
        const requestBody = {
          name: inputText.role,
          isAdmin: isAdmin,
          username: name,
          channelName: channelId.channel.name
        };
      
        try {
            
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`${username}:${password}`)}` 
            },
            body: JSON.stringify(requestBody)
          });
          if (response.ok) {

          } else {
            alert('Не удалось создать роль');
          }
        } catch (error) {
          alert('Ошибка при создании роли', error);
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


