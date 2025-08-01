import {Text, View} from 'react-native';
import React, { useContext } from 'react';
import StatusBarCom from '../../Components/StatusBarCom';
import Colors from '../../Constants/Colors';
import ImagePath from '../../Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {hp, wp} from '../../Constants/Responsive';
import ButtonCom from '../../Components/ButtonCom';
import ScreensName from '../../Navigations/ScreensName';
import { ThemeContext } from '../../Theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const OnBoardingTwo = ({navigation}) => {
      const {currentTheme} = useContext(ThemeContext);
       const {t} = useTranslation();
  const _next = parmod => {
    if (parmod) {
      navigation.navigate(ScreensName.ONBOARDINGTHREE);
    } else {
      navigation.navigate(ScreensName.LOGIN);
    }
  };
  return (
    <View style={[styles.container,{backgroundColor: currentTheme.backgroundColor,}]}>
        <StatusBarCom backgroundColor={currentTheme.backgroundColor} 
            // barStyle={currentTheme.textColor}
            />
      <View style={styles.skipBtn}>
      <Text style={[styles.skipTitle,{color:currentTheme.textColor}]} onPress={() => _next()}>
      {t('Skip')}
        </Text>
      </View>
      <View style={styles.imgContianer}>
        <FastImage
          source={ImagePath.OnBoardingImgTwo}
          style={styles.splashImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContent}>
        <View style={styles.OnBoardingContainer}>
          <Text style={[styles.OnBoardingTitleOne, {marginTop: hp(1.3),color:currentTheme.textColor}]}>
            {t('IncreaseWorkEffectiveness')}
          </Text>
          <Text style={[styles.OnBoardingParaOne,{color:currentTheme.textColor}]}>
            {t('TimemanagementImprove')}
          </Text>
        </View>
        <View style={[styles.dottedContianer,{marginTop:hp(-2)}]}>
          <Text style={[styles.dotted,{backgroundColor:currentTheme.textColor}]} />
          <Text
            style={[
              styles.dotted,
              {marginHorizontal: wp(2), backgroundColor: Colors.Primary},
            ]}
          />
          <Text style={[styles.dotted,{backgroundColor:currentTheme.textColor}]} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <ButtonCom propsContainer={{borderColor:currentTheme.textColorBtn}} propsLabel={{color:currentTheme.textColor}} label={t('Next')} onPress={() => _next('parmod')} />
        </View>
      </View>
    </View>
  );
};

export default OnBoardingTwo;
