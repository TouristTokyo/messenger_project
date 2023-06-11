import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { View } from 'react-native-web';
import useStyles from './changeAvatar.module';
import { TouchableOpacity } from 'react-native-web';
import PlusSvg from '../../../assets/icons/plusSvg';
import CameraSvg from '../../../assets/icons/cameraSvg';
import * as ImagePicker from 'expo-image-picker';
import { ImageContext } from '../../../context/ImageContext';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';
import ImageViewer from "../../ImageViewer/ImageViewer";

export default function ChangeAvatar({ children, ...data }) {
  const { updateSelectedImage } = useContext(ImageContext);
  const styles = useStyles();
  const [permission, setRequestPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // New state for hover tracking
  const { user, updateUser } = useContext(AuthContext);
  const username = 'admin';
  const password = 'root';
  const base64Image = `data:image/jpeg;base64,${user.image}`;
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setRequestPermission(cameraStatus.status === 'granted');
    })();
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result);
    } else {
    }
  };

  const uploadImage = async (imageAsset) => {
    const formData = new FormData();
    const response = await fetch(imageAsset.uri);
    const blob = await response.blob();

    formData.append('file', blob, 'file.jpg');

    const userId = user?.id;
    const apiUrl = `https://linking-api.onrender.com/api/users/${userId}/update/image`;

    try {
      const response = await axios.put(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSelectedImage(imageAsset.uri);
        updateSelectedImage(imageAsset.uri);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert('Ошибка ' + error.response.data.message);
      }
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.round}>
        <TouchableOpacity
          onPress={pickImageAsync}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!user.image && (
            <View style={styles.nonePhoto}>
              {isHovered ? <PlusSvg /> : null}
            </View>
          )}
          {user.image && (
            <View>
              {isHovered ? (
                <View style={styles.nonePhoto}>
                  <PlusSvg />
                </View>
              ) : (
                <ImageViewer style = {styles.image} isAvatar={true} selectedImage={base64Image} />
              )}
            </View>
          )}
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <TouchableOpacity onPress={openCamera}>
            <CameraSvg />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
