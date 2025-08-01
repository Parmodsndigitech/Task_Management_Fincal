import {
  Alert,
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import StatusBarCom from '../../Components/StatusBarCom';
import AppWapper from '../../Components/AppWapper';
import Colors from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import VectorIcon from '../../Constants/VectorIcon';
import ProfilesButtonCom from '../../Components/ProfilesButtonCom';
import {useNavigation} from '@react-navigation/native';
import ScreensName from '../../Navigations/ScreensName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from '../../Redux/Slice/LoginSlice';
import {useDispatch} from 'react-redux';
import LoaderCom from '../../Components/LoaderCom';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../Theme/ThemeContext';
import {ApiUrl} from '../../Utils/apiurl';
import {ToastCom} from '../../Components/ToastCom';
import FastImage from 'react-native-fast-image';
import ModalCom from '../../Components/ModalCom';
import i18n from '../../../i18n';

const lung = [
  {id: 1, languageName: 'English', langCode: 'en'},
  {id: 2, languageName: 'हिंदी', langCode: 'hi'},
  {id: 3, languageName: 'اردو', langCode: 'ur'},
  {id: 4, languageName: 'Panjabi', langCode: 'pa'},
];
const Profile = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {theme, toggleTheme, currentTheme} = useContext(ThemeContext);
  const navigaton = useNavigation();
  const [userProfileData, setUserProfileData] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const _logout = () => {
    Alert.alert('Alert Logout', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            AsyncStorage.removeItem('token');
            dispatch(setLogin(false));
            setLoading(false);
          }, 3000);
        },
      },
    ]);
  };
  useEffect(() => {
    _getUserProfileDetails();
  }, []);
  const _getUserProfileDetails = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
      const response = await fetch(ApiUrl.getUserProfileDetailsApi, {
        method: 'Get',
        // body: fd,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });
      const result = await response.json();
      setUserProfileData(result?.data);
      ToastCom({type: 'success', text2: result?.message});
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      ToastCom({type: 'error', text2: result?.message});
    }
  };

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    setIsModalVisible(true);
    I18nManager.forceRTL(!lang === 'ur' || !lang === 'hi');
  };
  const [modalVisibleAddressView, setModalVisibleAddressView] = useState(false);
  const toggleModalAddressView = item => {
    setModalVisibleAddressView(!modalVisibleAddressView);
  };

  return (
    <AppWapper
      containerProps={{
        backgroundColor: currentTheme.backgroundColor,
      }}>
      <StatusBarCom />
      <View
        style={{height: '100%', backgroundColor: currentTheme.backgroundColor}}>
        <View style={{flex: 0.35}}>
          <Text style={[styles.profleTxt, {color: currentTheme.textColor}]}>
            {t('Profile')}
          </Text>
          <View>
            {userProfileData?.profilePicture ? (
              <View
                style={[
                  styles.vactorIcon,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: wp(26.5),
                    width: wp(26.5),
                    borderRadius: wp(26.5),
                    marginBottom: hp(4),
                    borderWidth: wp(1),
                    borderColor: Colors.Primary,
                    backgroundColor: Colors.Primary,
                  },
                ]}>
                <FastImage
                  source={{uri: userProfileData?.profilePicture}}
                  style={[
                    styles.vactorIcon,
                    {
                      height: wp(25),
                      width: wp(25),
                      borderRadius: wp(25),
                    },
                  ]}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <VectorIcon
                type={'FontAwesome'}
                name={'user-circle-o'}
                color={currentTheme.textColor}
                size={100}
                style={styles.vactorIcon}
              />
            )}

            <View style={{marginTop: hp(-2)}}>
              <Text
                style={[styles.profileName, {color: currentTheme.textColor}]}
                numberOfLines={1}>
                {userProfileData?.name
                  ? userProfileData?.name
                  : 'Name Not Found'}
              </Text>
              <Text
                style={[styles.profileName, {color: currentTheme.textColor}]}
                numberOfLines={1}>
                {userProfileData?.email
                  ? userProfileData?.email
                  : 'Gamil Id Not Found'}
              </Text>
              <Text
                style={[styles.profileName, {color: currentTheme.textColor}]}
                numberOfLines={1}>
                {userProfileData?.mobileNo
                  ? userProfileData?.mobileNo
                  : 'Mobile No Not Found'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{flex: 0.6, marginTop: hp(3)}}>
          <ScrollView>
            <ProfilesButtonCom
              type={'Feather'}
              name={'lock'}
              labal={t('PrivacyPolicy')}
              onPress={() => navigaton.navigate(ScreensName.PRIVACYPOLICY)}
            />
            <ProfilesButtonCom
              type={'MaterialCommunityIcons'}
              name={'help'}
              labal={t('Help')}
              onPress={() => navigaton.navigate(ScreensName.HELPCENTER)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(5),
                justifyContent: 'space-between',
                paddingHorizontal: wp(8),
              }}>
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'theme-light-dark'}
                color={currentTheme.textColor}
                size={25}
                style={[{width: wp(5)}]}
              />
              <ProfilesButtonCom
                buttonContianerProps={{
                  paddingHorizontal: wp(0),
                  flex: 0.97,
                  marginRight: wp(-4),
                }}
                buttonTitleProps={{color: currentTheme.textColor}}
                vactorIconRight={Colors.Black}
                showLeftIcon={true}
                type={'MaterialIcons'}
                size={45}
                color={theme === 'light' ? 'grey' : 'green'}
                name={'dark-mode'}
                labal={
                  theme === 'light'
                    ? `${t('SwitchDarkMode')}`
                    : `${t('SwitchLightMode')}`
                }
                leftIonType={'Fontisto'}
                leftIconName={theme === 'light' ? 'toggle-off' : 'toggle-on'}
                onPress={() =>
                  toggleTheme(theme === 'light' ? 'dark' : 'light')
                }
              />
            </View>
            <ProfilesButtonCom
              type={'FontAwesome'}
              name={'language'}
              labal={t('change_language')}
              onPress={() => changeLanguage('es')}
            />
            {loading ? (
              <LoaderCom />
            ) : (
              <ProfilesButtonCom
                buttonContianerProps={{paddingLeft: wp(5.5)}}
                type={'MaterialCommunityIcons'}
                name={'logout'}
                labal={t('Logout')}
                onPress={_logout}
              />
            )}
            <Text style={{marginBottom: hp(5)}} />
          </ScrollView>
        </View>
      </View>
      <ModalCom
        contianerStyle={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(0,0,0,.6)',
        }}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View
          style={[
            styles.ModalInnderContainer,
            {
              backgroundColor: currentTheme.backgroundColor,
              borderColor: currentTheme.textColor,
            },
          ]}>
          <Text
            style={[
              styles.changeLanguageTitle,
              {color: currentTheme.textColor, marginVertical: hp(2)},
            ]}>
            {t('change_language')}
          </Text>
          <View
            onPress={() => setIsModalVisible(false)}
            style={[styles.flatListContainer, {}]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={lung}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeLanguage(item.langCode)}>
                    <Text
                      style={[
                        styles.languageName,
                        {
                          color: currentTheme.textColor,
                          borderColor: currentTheme.textColor,
                        },
                      ]}>
                      {item.languageName}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
          <Text
            onPress={() => setIsModalVisible(false)}
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2.3),
              alignSelf: 'center',
              borderWidth: wp(0.3),
              borderColor: currentTheme.textColor,
              paddingHorizontal: wp(2.5),
              paddingVertical: hp(0.6),
              borderRadius: wp(1.2),
              marginTop: hp(4),
              fontWeight: '500',
            }}>
            Save Change
          </Text>
        </View>
      </ModalCom>
    </AppWapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profleTxt: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: hp(3.5),
    fontFamily: Fonts.InterBold700,
  },
  vactorIcon: {
    height: wp(34),
    width: wp(34),
    borderRadius: wp(34),
    // backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  profileName: {
    color: Colors.White,
    fontFamily: Fonts.PoppinsMedium500,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: hp(2.1),
    lineHeight: hp(2.6),
    fontWeight: '700',
    // letterSpacing: wp(0.3),
  },

  ModalInnderContainer: {
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    borderWidth: wp(0.3),
    borderBottomWidth: wp(0),
    flex: 0.5,
    paddingHorizontal: wp(4),
    backgroundColor: Colors.Black,
  },
  changeLanguageTitle: {
    color: Colors.Black,
    textAlign: 'center',
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    marginVertical: hp(1),
  },
  flatListContainer: {
    maxHeight: '50%',
  },
  languageName: {
    borderColor: Colors.Black,
    borderWidth: wp(0.3),
    borderColor: Colors.BlackOpactiy,
    marginBottom: hp(1.5),
    padding: wp(2),
    paddingVertical: hp(1.7),
    borderRadius: wp(1.5),
    fontSize: hp(2),
  },
});
