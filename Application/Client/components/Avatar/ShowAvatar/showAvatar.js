import React, { useContext } from 'react';
import { View, Image } from 'react-native-web';
import useStyles from './showAvatar.module';
import PlusSvg from '../../../assets/icons/plusSvg';
import { ImageContext } from '../../../context/ImageContext';
import AuthContext from '../../../context/AuthContext';

export default function ShowAvatar({ imageUrl, profile, }) {
  const styles = useStyles({ profile });
  const { selectedImage } = useContext(ImageContext);
  const { user } = useContext(AuthContext); 

  const renderAvatar = () => {
    if (imageUrl && imageUrl.startsWith('data:image')) {
      return <Image style={styles.image} source={{ uri: imageUrl }} />;
    } else if (imageUrl) {
      return <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${imageUrl}` }} />;
    } else if (user.image) {
      const base64Image = `data:image/jpeg;base64,${user.image}`;
      return <Image style={styles.image} source={{ uri: base64Image }} />;
    } else {
      return (
        <View style={styles.nonePhoto}>
          <PlusSvg style={{ transform: [{ scale: 0.5 }] }} />
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.round}>
      {renderAvatar()}
      </View>
    </View>
  );
}
