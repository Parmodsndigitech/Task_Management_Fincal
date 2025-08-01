// Library
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Keyboard, StyleSheet, View} from 'react-native';
import * as Screen from '../Screens/Index';
import ScreensName from './ScreensName';
import ImagePath from '../Constants/ImagePath';
import {hp, wp} from '../Constants/Responsive';
import {useContext, useEffect, useState} from 'react';
import Colors from '../Constants/Colors';
import { ThemeContext } from '../Theme/ThemeContext';
// // import { t } from 'i18next';

const BottomTab = createBottomTabNavigator();
// Varables
const WIDTH = wp(9);
const HEIGHT = hp(4.5);
const WIDTH_HEIGHT100 = '100%';
const ACTIVECOLOR = Colors.Primary;
const UNACTIVECOLOR = Colors.BlackOpactiyTxt;

export default BottomNavigation = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { currentTheme} = useContext(ThemeContext);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>

    <BottomTab.Navigator
      initialRouteName={ScreensName.HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#3e3e3e',
          height: hp(7.5),
          alignItems: 'center',
          paddingTop: hp(1),
          width: '90%',
          alignSelf: 'center',
          borderRadius: wp(5),
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          marginBottom: hp(3),
          position: 'absolute',
          marginLeft: wp(5),
          borderWidth:wp(.3),
          borderColor: Colors.BlackOpactiyTxt,
          shadowColor: 'white',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTab.Screen
        name={ScreensName.HOME}
        component={Screen.Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.home}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.home} style={style.image_Icon} />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name={ScreensName.ABOUT}
        component={Screen.About}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.calendar}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.calendar} style={style.image_Icon} />
              </View>
            ),
        }}
      />
      {/* <BottomTab.Screen
        name={ScreensName.CONTACT}
        component={Screen.Contact}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.calendarHistory}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.calendarHistory}
                  style={style.image_Icon}
                />
              </View>
            ),
        }}
      /> */}
      <BottomTab.Screen
        name={ScreensName.PROFILE}
        component={Screen.Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.profile}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.profile} style={style.image_Icon} />
              </View>
            ),
        }}
      />
    </BottomTab.Navigator>
        </>
  );
};
const style = StyleSheet.create({
  image_contianer: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_Icon: {
    width: WIDTH_HEIGHT100,
    height: WIDTH_HEIGHT100,
    tintColor: UNACTIVECOLOR,
  },
});
