import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { View } from "react-native-web";
import useStyles from "./changeAvatar.module";
import { TouchableOpacity, Text } from 'react-native-web';
import PlusSvg from '../../../assets/icons/plusSvg';
import CameraSvg from '../../../assets/icons/cameraSvg';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../../ImageViewer/ImageViewer';
import { ImageContext } from '../../../context/ImageContext';


export default function ChangeAvatar({  children, ...data}) {
  const { updateSelectedImage } = useContext(ImageContext);
  const styles = useStyles();
  const [permission, setRequestPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setRequestPermission(cameraStatus.status === 'granted');
    })();
  })

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      updateSelectedImage(result.assets[0].uri); // Update the selected image in the context
    }  else {
      
      //оставить текущую
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
       <View style={styles.round}>
            <TouchableOpacity onPress={pickImageAsync}>
                {!selectedImage&&<View style={styles.nonePhoto}>
                    <PlusSvg />
                </View>}
                {selectedImage&& <ImageViewer isAvatar={true} selectedImage={selectedImage}/>}  
            </TouchableOpacity>
            <View style={{position: 'absolute', bottom: 0, right: 0}}>
              <TouchableOpacity onPress={openCamera}>
                  <CameraSvg />
              </TouchableOpacity>
            </View> 
       </View>
    </View>
  );
}