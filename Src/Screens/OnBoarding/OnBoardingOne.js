import {Text, View} from 'react-native';
import React, { useContext } from 'react';
import StatusBarCom from '../../Components/StatusBarCom';
import Colors from '../../Constants/Colors';
import ImagePath from '../../Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {wp} from '../../Constants/Responsive';
import ButtonCom from '../../Components/ButtonCom';
import ScreensName from '../../Navigations/ScreensName';
import {useTranslation} from 'react-i18next';
import { ThemeContext } from '../../Theme/ThemeContext';


const OnBoardingOne = ({navigation}) => {
    const {currentTheme} = useContext(ThemeContext);
    const {t} = useTranslation();
  const _next = parmod => {
    if (parmod) {
      navigation.navigate(ScreensName.ONBOARDINGTWO);
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
          source={ImagePath.OnBoardingImgOne}
          style={styles.splashImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContent}>
        <View style={styles.OnBoardingContainer}>
          <Text style={[styles.OnBoardingTitleOne,{color:currentTheme.textColor}]}>{t('EasyTimeManagement')}</Text>
          <Text style={[styles.OnBoardingParaOne,{color:currentTheme.textColor}]}>
           {t("Withmanagementbased")}{' '}
          </Text>
        </View>
        <View style={styles.dottedContianer}>
          <Text style={[styles.dotted, {backgroundColor: Colors.Primary}]} />
          <Text style={[styles.dotted, {marginHorizontal: wp(2),backgroundColor:currentTheme.textColor}]} />
          <Text style={[styles.dotted,{backgroundColor:currentTheme.textColor}]} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <ButtonCom propsContainer={{borderColor:currentTheme.textColorBtn}} propsLabel={{color:currentTheme.textColor}} label={t('Next')} onPress={() => _next('parmod')} />
        </View>
      </View>
    </View>
  );
};

export default OnBoardingOne;
