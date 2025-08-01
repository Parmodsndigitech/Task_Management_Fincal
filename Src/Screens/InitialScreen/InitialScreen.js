import {StyleSheet, View} from 'react-native';
import React, { useContext } from 'react';
import Colors from '../../Constants/Colors';
import StatusBarCom from '../../Components/StatusBarCom';
import AppWapper from '../../Components/AppWapper';
import ImagePath from '../../Constants/ImagePath';
import {wp} from '../../Constants/Responsive';
import ScreensName from '../../Navigations/ScreensName';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../Theme/ThemeContext';
const InitialScreen = ({}) => {
  const navigation=useNavigation()
      const {currentTheme} = useContext(ThemeContext);
  setTimeout(() => {
    navigation.navigate(ScreensName.ONBOARDINGONE);
  }, 1000);
  return (
    <AppWapper containerProps={styles.containerProps}>
      <StatusBarCom backgroundColor={Colors.Black} barStyle={'light-content'} />
      <View style={styles.imgContianer}>
        <FastImage source={ImagePath.logo} style={styles.gurujiImg} />
      </View>
    </AppWapper>
  );
};
export default InitialScreen;
const styles = StyleSheet.create({
  containerProps: {
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContianer: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    backgroundColor:Colors.White
  },
  gurujiImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

