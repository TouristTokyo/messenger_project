import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { View, Image} from "react-native-web";
import useStyles from "./showAvatar.module";
import { Text } from 'react-native';
import PlusSvg from "../../../assets/icons/plusSvg"
import { ImageContext } from '../../../context/ImageContext';

export default function ShowAvatar({ imageUrl, profile }) {
  const styles = useStyles({ profile });
  const { selectedImage } = useContext(ImageContext);
  return (
    <View style={styles.container}>
      <View style={styles.round}>
        {selectedImage ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <View style={styles.nonePhoto}>
            <PlusSvg style={{ transform: [{ scale: 0.5 }] }} />
          </View>
        )}
      </View>
    </View>
  );
}
