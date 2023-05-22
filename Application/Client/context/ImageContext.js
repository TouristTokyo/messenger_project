import React, { createContext, useState, useEffect } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('selectedImage');
    if (storedImage) {
      setSelectedImage(JSON.parse(storedImage));
    }
    
  }, []);

  const updateSelectedImage = (image) => {
    setSelectedImage(image);
    localStorage.setItem('selectedImage', JSON.stringify(image));
  };

  return (
    <ImageContext.Provider value={{ selectedImage, updateSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
};
