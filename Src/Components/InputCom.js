import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Constants/Colors';
import {hp, wp} from '../Constants/Responsive';
import Fonts from '../Constants/Fonts';
import VectorIcon from '../Constants/VectorIcon';
// import VectorIcon from '../Constants/VectorIcon';
const InputCom = ({
  placeholder,
  keyboardType,
  maxLength,
  showHide,
  value,
  onChangeText,
  secureTextEntry,
  editable,
  propsInput,
  propscontianer,
  numberOfLines,
  onPress,
  placeholderTextColor,
  colorVectorIcon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{...styles.contianer, ...propscontianer}}>
      <TextInput
        style={{...styles.input, ...propsInput}}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : 'default'}
        maxLength={maxLength ? maxLength : undefined}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : Colors.Black
        }
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        numberOfLines={numberOfLines ? numberOfLines : null}
      />
      {showHide && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <VectorIcon
            type={'Ionicons'}
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={
              colorVectorIcon
                ? colorVectorIcon
                : isPasswordVisible
                ? Colors.Primary
                : Colors.Black
            }
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default InputCom;
const styles = StyleSheet.create({
  contianer: {
    backgroundColor: Colors.BlackOpactiy,
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderColor: Colors.Black,
  },
  input: {
    padding: 0,
    margin: 0,
    width: '92%',
    height: '100%',
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.9),
    color: Colors.Black,
  },
});
