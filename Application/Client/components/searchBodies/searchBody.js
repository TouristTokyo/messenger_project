import React from "react";
import { View, Text, TouchableHighlight } from "react-native-web";
import ShowAvatar from "../Avatar/ShowAvatar/showAvatar";
import DeleteSvg from "../../assets/icons/deleteSvg";
import useStyles from "./searchBodies.module";

export default function SearchBody({ data }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { avatarUrl, username, onPress, containerStyle, main, id} = data;
  const name = 'admin';
  const password = 'root';
  const styles = useStyles();

  const deleteChat = () => {
    fetch(`https://linking-api.onrender.com/api/chats/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${name}:${password}`)}`,
      },
    })
      .then(response => {
        if (response.ok) {
          alert("Чат успешно удалён");
          window.location.reload();
        } else {
          alert("Не удалоось удалить чат");
        }
      })
      .catch(error => {
        alert("Ошибка при удалении чата", error);
      });
  };

  return (
    <TouchableHighlight
      style={[styles.container, containerStyle, isHovered && { backgroundColor: "#E7DEDE" }]}
      onPress={onPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <View style={styles.rowContainer}>
        {avatarUrl && (
          <View style={styles.avatarContainer}>
            <ShowAvatar imageUrl={avatarUrl} />
            <Text style={styles.username}>{username}</Text>
          </View>
        )}
        {!avatarUrl && <Text style={styles.channelName}>{username}</Text>}
        {main && (
          <View style={[styles.deleteContainer, { transform: [{ scale: 0.5 }] }]}>
            <TouchableHighlight onPress={deleteChat}>
              <DeleteSvg />
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
}



