import React from "react";
import { View, StyleSheet, Text, TouchableHighlight, Image } from "react-native-web";
import ShowAvatar from "../Avatar/ShowAvatar/showAvatar";

export default function SearchBody({ data }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { avatarUrl, username, channelName, onPress, containerStyle } = data;
 
  return (
    <TouchableHighlight
      style={[styles.container, containerStyle, isHovered && { backgroundColor: "#E7DEDE" }]}
      onPress={onPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatarUrl ? (
        <View style={styles.avatarContainer}>
          <ShowAvatar imageUrl= {avatarUrl}  />
          <Text style={styles.username}>{username}</Text>
        </View>
      ) : (
        <Text style={styles.channelName}>{username}</Text>
      )}
    </TouchableHighlight>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  channelName: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
