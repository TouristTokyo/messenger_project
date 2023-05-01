import React, { useState } from "react";
import { View, Text, TextInput, TouchableHighlight} from "react-native-web";
import useStyles from "./searchInput.modules";
import SearchSvg from "../../../assets/icons/searchSvg";
import CrossSvg from "../../../assets/icons/crossSvg";

export default function SearchInput({ value, setValue, ...data }) {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useStyles();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setValue("");
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
     
        <SearchSvg style={styles.icon} />
        <TextInput
          {...data}
          placeholderTextColor={"#7C858E"}
          value={value}
          style={[styles.input, { paddingLeft: 36 }]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => setValue(text)}
        />
      {isFocused && (
        <TouchableHighlight onPress={handleClear}>
          <CrossSvg style={styles.dismissIcon} />
        </TouchableHighlight>
      )}
    </View>
  );
}
