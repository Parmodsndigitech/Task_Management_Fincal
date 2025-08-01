import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext, useState } from 'react';
import VectorIcon from '../Constants/VectorIcon';
import Colors from '../Constants/Colors';
import { hp, wp } from '../Constants/Responsive';
import Fonts from '../Constants/Fonts';
import { ThemeContext } from '../Theme/ThemeContext';
// import VectorIcon from '../Constants/VectorIcon';
// import Colors from '../Constants/Colors';
// import {hp, wp} from '../Constants/Responsive';
// import Fonts from '../Constants/Fonts';

const ProfilesButtonCom = ({color,size,name, type, onPress, labal,leftIonType,leftIconName,buttonContianerProps,buttonTitleProps,vactorIconLeft,vactorIconRight,showLeftIcon}) => {
   const {currentTheme} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{...styles.buttonContianer,...buttonContianerProps}}>
      <View style={[styles.buttonContianer, styles.buttonInnerLeft]}>
        {!showLeftIcon&&
 <VectorIcon
 type={type}
 name={name}
 color={vactorIconLeft?vactorIconLeft:currentTheme.textColor}
 size={25}
 style={styles.vactorIconButtonLeft}
/>
        }
        <Text style={[{...styles.buttonTitle,...buttonTitleProps},{color:currentTheme.textColor}]}>{labal}</Text>
      </View>
      <VectorIcon
        type={!leftIonType?'Feather':leftIonType}
        name={!leftIconName?'chevron-right':leftIconName}
        color={color?color:vactorIconRight?vactorIconRight:currentTheme.textColor}
        size={size?size:35}
      />
    </TouchableOpacity>
  );
};

export default ProfilesButtonCom;
const styles = StyleSheet.create({
  buttonContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  buttonInnerLeft: {
    paddingHorizontal: wp(0),
    paddingVertical: hp(0),
  },
  buttonTitle: {
    color: Colors.White,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(2.5),
    textTransform: 'capitalize',
    marginLeft: wp(1),
  },
  vactorIconButtonLeft: {
    // backgroundColor: Colors.Primary,
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: wp(2),
    borderRadius: wp(12),
  },
});
