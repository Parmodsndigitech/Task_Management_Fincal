import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AppWapper from '../../Components/AppWapper';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import HeaderCom from '../../Components/HeaderCom';
import StatusBarCom from '../../Components/StatusBarCom';
import ShareSocialMediaCom from '../../Components/ShareSocialMediaCom';
import {ThemeContext} from '../../Theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const HelpCenter = ({navigation}) => {
  const {currentTheme} = useContext(ThemeContext);
   const {t} = useTranslation();
  return (
    <AppWapper containerProps={{backgroundColor:currentTheme.backgroundColor}}>
      <StatusBarCom backgroundColor={Colors.Black} barStyle={'light-content'} />
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={'Help Support'}
      />
      <ScrollView contentContainerStyle={{paddingBottom: hp(15)}}>
        <View style={{}}>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2.5),
              marginBottom: hp(3),
              marginTop: hp(2),
              marginLeft: wp(4),
              fontWeight: '700',
            }}>
            {' '}
            We're Ready to Help!
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(1.9),
              marginLeft: wp(6),
              width: '80%',
              marginBottom: hp(15),
            }}>
            Whether it's an issue or a question, we're just a click away.
            Contact us, and we'll guide you through it!
          </Text>
          <View style={{alignSelf: 'center', marginBottom: hp(5)}}>
            <View style={{alignSelf: 'center'}}>
              <ShareSocialMediaCom
                onPress={() =>
                  Linking.openURL(
                    'https://www.youtube.com/@tvshambhusharanlataji9735/featured',
                  )
                }
                type={'AntDesign'}
                name={'customerservice'}
                size={80}
                iconContianerProps={{
                  backgroundColor: currentTheme.backgroundColor,
                  width: wp(25),
                  height: wp(25),
                  color: currentTheme.textColor,
                }}
              />
            </View>
            <Text style={{color: currentTheme.textColor, fontSize: hp(1.7)}}>
              If you are faching anything Contact Us{' '}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <ShareSocialMediaCom
              onPress={() =>
                Linking.openURL(
                  // `tel:+91${item?.relatedDetailsStudent?.mobile}`,
                  `tel:+91${7827103427}`,
                )
              }
              type={'FontAwesome5'}
              name={'phone'}
              iconContianerProps={{backgroundColor: 'green'}}
            />
            <Text style={{marginHorizontal: wp(4)}} />
            <ShareSocialMediaCom
              onPress={() => {
                Linking.openURL(
                  // `mailto:${item?.relatedDetailsStudent?.email}`,
                  `mailto:${`parmodkumar18051999@gmail.com`}`,
                ).catch(err =>
                  console.error('Failed to open email client', err),
                );
              }}
              type={'MaterialCommunityIcons'}
              name={'gmail'}
              size={44}
              iconContianerProps={{backgroundColor: '#D00000'}}
            />
          </View>
        </View>
      </ScrollView>
    </AppWapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: wp(4),
  },
  policyTitle: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.6),
    marginVertical: hp(2),
    textTransform: 'capitalize',
  },
  policyPara: {
    color: Colors.White,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.6),
    marginVertical: hp(0),
  },
  countNo: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
  },
  footer: {
    backgroundColor: Colors.Black,
    width: '100%',
    height: hp(10),
  },
});
