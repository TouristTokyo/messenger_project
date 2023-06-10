import { Image } from 'expo-image';
import useStyles from './ImageViewer.module';
import PlusSvg from '../../assets/icons/plusSvg';

export default function ImageViewer({ placeholderImageSource, selectedImage, isAvatar }) {
    const styles = useStyles();
    const imageSource = selectedImage !== null
      ? { uri: selectedImage }
      : placeholderImageSource;
  
    return <Image source={imageSource} style={isAvatar && styles.Avatarimage} />;
}