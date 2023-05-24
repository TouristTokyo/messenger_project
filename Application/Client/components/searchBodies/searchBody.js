import React from "react";
import { View, StyleSheet, Text, TouchableHighlight, Image } from "react-native-web";
import ShowAvatar from "../Avatar/ShowAvatar/showAvatar";
import DeleteSvg from "../../assets/icons/deleteSvg";
import useStyles from "./searchBodies.module";

export default function SearchBody({ data }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { avatarUrl, username, channelName, onPress, containerStyle, main, id} = data;
  const name = 'admin';
  const password = 'root';
  const styles = useStyles();
  const deleteChat = () => {
    
    fetch(`http://localhost:8080/api/chats/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${name}:${password}`)}`,
      },
    })
      .then(response => {
        // Handle the response
        if (response.ok) {
          // Chat deleted successfully
          alert("Chat deleted successfully");
          window.location.reload();
        } else {
          // Error deleting chat
          console.log("Failed to delete chat");
        }
      })
      .catch(error => {
        console.error("Error deleting chat:", error);
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



