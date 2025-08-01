import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../Theme/ThemeContext';
import i18n from '../../../i18n';
import InputCom from '../../Components/InputCom';
import AppWapper from '../../Components/AppWapper';
import StatusBarCom from '../../Components/StatusBarCom';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import ButtonCom from '../../Components/ButtonCom';
import LoaderCom from '../../Components/LoaderCom';
import ModalCom from '../../Components/ModalCom';
import ProfilesButtonCom from '../../Components/ProfilesButtonCom';
import {ToastCom} from '../../Components/ToastCom';
import VectorIcon from '../../Constants/VectorIcon';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ScreensName from '../../Navigations/ScreensName';
import {setLogin} from '../../Redux/Slice/LoginSlice';
import {useDispatch} from 'react-redux';

const lung = [
  {id: 1, languageName: 'English', langCode: 'en'},
  {id: 2, languageName: 'हिंदी', langCode: 'hi'},
  {id: 3, languageName: 'اردو', langCode: 'ur'},
  {id: 4, languageName: 'Panjabi', langCode: 'pa'},
];
// const {dispatch} = store;
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {theme, toggleTheme, currentTheme} = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {t} = useTranslation();
  const isEmailValid = emailAddress => {
    const email =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return email.test(emailAddress);
  };
  // Change Language function
  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    setIsModalVisible(true);
    I18nManager.forceRTL(!lang === 'ur' || !lang === 'hi');
  };
  // const changeLanguage = lang => {
  //   i18n.changeLanguage(lang);
  //   setIsModalVisible(true);
  //   I18nManager.forceRTL(false);  
  //   I18nManager.allowRTL(false);  
  //   };
  // const onLogin = () => {
  //   dispatch(saveUserData({isLogin: true}));
  // };
  const simulateLoading = () => {
    if (email == '') {
      ToastCom({type: 'error', text2: 'Please Enter Gmail Id'});
      return;
    }
    if (!isEmailValid(email)) {
      ToastCom({type: 'error', text2: 'Please enter a valid Email Address.'});
      return;
    }
    if (password == '') {
      ToastCom({type: 'error', text2: 'Please Enter Password'});
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // onLogin();
      _loginUserGmail();
      setLoading(false);
    }, 500);
  };
  const _loginUserGmail = async () => {
    let config = {
      url: `${ApiUrl.LoginMobileEmailApi}`,
      method: 'post',
      body: {
        email: email,
        password: password,
      },
    };
    setLoading(true);
    await APIRequest(
      config,
      res => {
        ToastCom({type: 'success', text2: res?.message});
        AsyncStorage.setItem('token', res?.token).catch(err =>
          console.log(err),
        );
        dispatch(setLogin(true));
        setLoading(false);
        navigation.navigate(ScreensName.BOTTOMNAVIGATION);
      },
      err => {
        console.log(err?.message, '---err');
        setLoading(false);
        if (err?.message) {
          ToastCom({type: 'error', text2: err?.message});
        }
      },
    );
  };
  const [mobileNo, setMobileNo] = useState('');
  const [passwordMobile, setPasswordMobile] = useState('');
  const isMobileValid = mobileAddress => {
    const mobileNo = /^\d{10}$/;
    return mobileNo.test(mobileAddress);
  };
  const onLogInWithMobileNoPress = () => {
    if (mobileNo == '') {
      ToastCom({type: 'error', text2: 'Please Enter 10 Digit mobile no'});
      return;
    }
    if (!isMobileValid(mobileNo)) {
      ToastCom({type: 'error', text2: 'Please Enter 10 Digit Valid mobile no'});
      return;
    }
    if (passwordMobile == '') {
      ToastCom({type: 'error', text2: 'Please Enter Password'});
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // onLogin();
      _loginUserMobile();
      setLoading(false);
    }, 500);
  };
  const _loginUserMobile = async () => {
    let config = {
      url: `${ApiUrl.LoginMobileEmailApi}`,
      method: 'post',
      body: {
        phoneNumber: mobileNo,
        password: passwordMobile,
      },
    };
    setLoading(true);
    await APIRequest(
      config,
      res => {
        ToastCom({type: 'success', text2: res?.message});
        AsyncStorage.setItem('token', res?.token).catch(err =>
          console.log(err),
        );
        dispatch(setLogin(true));
        setLoading(false);
        navigation.navigate(ScreensName.BOTTOMNAVIGATION);
      },
      err => {
        console.log(err?.message, '---err');
        setLoading(false);
        if (err?.message) {
          ToastCom({type: 'error', text2: err?.message});
        }
      },
    );
  };
  const [modalVisibleAddressView, setModalVisibleAddressView] = useState(false);
  const toggleModalAddressView = item => {
    setModalVisibleAddressView(!modalVisibleAddressView);
  };
  return (
    <AppWapper
      containerProps={{
        backgroundColor: currentTheme.backgroundColor,
        paddingHorizontal: wp(4),
      }}>
      <StatusBarCom backgroundColor={currentTheme.backgroundColor} />
      <View style={{height: '100%'}}>
        <View style={styles.flexContaner}>
          <Text style={[styles.loginTitle, {color: currentTheme.textColor}]}>
            {t('Login')}
          </Text>
        </View>
        <ScrollView style={{flex: 1}}>
          <View
            style={[
              styles.flexContaner,
              {justifyContent: 'flex-start', paddingHorizontal: wp(2)},
            ]}>
            <Text
              style={[
                styles.loginTitle,
                {
                  textAlign: 'left',
                  fontSize: hp(2),
                  color: currentTheme.textColor,
                },
              ]}>
              {t('UserName')}
            </Text>

            <View style={{marginVertical: hp(1)}}>
              <InputCom
                propscontianer={{
                  backgroundColor: Colors.Transplant,
                  borderWidth: wp(0.3),
                  borderColor: currentTheme.textColor,
                }}
                placeholder={t('EnteruserName')}
                keyboardType={'email-address'}
                onChangeText={txt => setEmail(txt)}
                value={email}
                propsInput={{color: currentTheme.textColor}}
                placeholderTextColor={currentTheme.textColor}
              />
            </View>
            <Text
              style={[
                styles.loginTitle,
                {
                  textAlign: 'left',
                  fontSize: hp(2),
                  color: currentTheme.textColor,
                },
              ]}>
              {t('Password')}
            </Text>
            <View style={{marginVertical: hp(1)}}>
              <InputCom
                placeholder={'*************'}
                propscontianer={{
                  backgroundColor: Colors.Transplant,
                  borderWidth: wp(0.3),
                  borderColor: currentTheme.textColor,
                }}
                onChangeText={txt => setPassword(txt)}
                secureTextEntry={true}
                value={password}
                showHide
                propsInput={{color: currentTheme.textColor}}
                colorVectorIcon={currentTheme.textColor}
                placeholderTextColor={currentTheme.textColor}
              />
            </View>
            <Text
              onPress={() => toggleModalAddressView()}
              style={[
                styles.forgotPassText,
                {
                  marginTop: hp(0),
                  marginRight: wp(1),
                  color: currentTheme.textColor,
                },
              ]}>
              {t('LoginWithMobileNo')}
            </Text>
            {loading ? (
              <LoaderCom />
            ) : (
              <View style={styles.btnContianer}>
                <ButtonCom
                  label={t('Login')}
                  // disabled={email && password ? false : true}
                  propsLabel={{color: currentTheme.textColor}}
                  propsContainer={{
                    width: '80%',
                    backgroundColor: Colors.Transplant,
                    borderWidth: wp(0.3),
                    borderColor: currentTheme.textColor,
                    // email && password ? Colors.Primary : Colors.BlackOpactiyTxt,
                  }}
                  onPress={() => simulateLoading()}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {/* Langauage Btn  */}
        {/* {
          console.log('pamrod...',email)
        } */}
        <View
          style={[styles.languageBtn, {position: 'absolute', bottom:email=='' || password=='' ?hp(4):hp(4)}]}>
          <Text
            style={[
              styles.languageBtnTitle,
              {
                backgroundColor: Colors.Transplant,
                color: currentTheme.textColor,
                fontWeight: '600',
                borderWidth: wp(0.3),
                borderColor: currentTheme.textColor,
                borderRadius: wp(2),
              },
            ]}
            onPress={() => changeLanguage('es')}>
            {t('change_language')}
          </Text>
        </View>

        {/* bottom Model for Selected  Langauage & Color Theme */}
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
            <View style={{marginTop: hp(1)}}>
              <ProfilesButtonCom
                buttonContianerProps={{paddingHorizontal: wp(0)}}
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
                marginTop: hp(2),
                fontWeight: '500',
              }}>
              Save Change
            </Text>
          </View>
        </ModalCom>

        {/* Model for Login With  Mobile No    */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleAddressView}
          style={{margin: 0}}
          onRequestClose={toggleModalAddressView}>
          <TouchableOpacity
            activeOpacity={1}
            //  onPress={toggleModalAddressView}
            style={[
              styles.modalOverlay,
              {
                backgroundColor: 'rgba(0,0,0,.6)',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View
              style={[
                styles.modalContentMoble,
                {
                  backgroundColor: currentTheme.backgroundColor,
                  borderColor: currentTheme.textColor,
                },
              ]}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                  style={[
                    styles.loginMobileMobileTitle,
                    {
                      color: currentTheme.textColor,
                    },
                  ]}>
                  {t('LoginAsMobileNo')}
                </Text>
                <View
                  style={{
                    marginVertical: hp(2),
                    gap: hp(1),
                    width: '94%',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={[
                      styles.modleTitliInput,
                      {
                        color: currentTheme.textColor,
                      },
                    ]}>
                    {t('UserIDYourMobile')}
                  </Text>
                  <InputCom
                    propscontianer={{
                      backgroundColor: Colors.Transplant,
                      borderWidth: wp(0.3),
                      borderColor: currentTheme.textColor,
                    }}
                    placeholder={t('Enteryourmobleno')}
                    keyboardType={'number-pad'}
                    onChangeText={txt => setMobileNo(txt)}
                    value={mobileNo}
                    propsInput={{color: currentTheme.textColor}}
                    placeholderTextColor={currentTheme.textColor}
                    maxLength={10}
                  />
                  <Text
                    style={[
                      styles.modleTitliInput,
                      {
                        color: currentTheme.textColor,
                      },
                    ]}>
                    {t('Password')}
                  </Text>
                  <InputCom
                    placeholder={'*************'}
                    propscontianer={{
                      backgroundColor: Colors.Transplant,
                      borderWidth: wp(0.3),
                      borderColor: currentTheme.textColor,
                    }}
                    onChangeText={txt => setPasswordMobile(txt)}
                    secureTextEntry={true}
                    value={passwordMobile}
                    showHide
                    propsInput={{color: currentTheme.textColor}}
                    colorVectorIcon={currentTheme.textColor}
                    placeholderTextColor={currentTheme.textColor}
                  />
                  <Text
                    onPress={() => toggleModalAddressView()}
                    style={[
                      styles.forgotPassText,
                      {color: currentTheme.textColor},
                    ]}>
                    {t('LoginWithGmailId')}
                  </Text>

                  {loading ? (
                    <LoaderCom />
                  ) : (
                    <View style={{marginTop: hp(3), alignSelf: 'center'}}>
                      <ButtonCom
                        label={t('Login')}
                        propsLabel={{color: currentTheme.textColor}}
                        propsContainer={{
                          width: '70%',
                          backgroundColor: Colors.Transplant,
                          borderWidth: wp(0.3),
                          borderColor: currentTheme.textColor,
                        }}
                        onPress={() => onLogInWithMobileNoPress()}
                      />
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={[
                    styles.closeButton,
                    {marginTop: hp(4), alignSelf: 'center'},
                  ]}
                  onPress={toggleModalAddressView}>
                  <VectorIcon
                    type={'AntDesign'}
                    name={'closecircleo'}
                    size={hp(5)}
                    color={currentTheme.textColor}
                    style={{alignItems: 'flex-end'}}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </AppWapper>
  );
};
export default Login;
const styles = StyleSheet.create({
  flexContaner: {
    flex: 0.3,
    justifyContent: 'center',
  },
  loginTitle: {
    fontFamily: Fonts.InterBold700,
    fontSize: hp(5),
    textAlign: 'center',
    color: Colors.White,
  },
  btnContianer: {
    justifyContent: 'flex-start',
    paddingHorizontal: wp(4),
    alignItems: 'center',
    marginTop: hp(5),
  },
  // ###############
  languageBtn: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    // flex: 0.35,
  },
  languageBtnTitle: {
    backgroundColor: Colors.BlackOpactiyTxt,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.3),
    borderRadius: wp(1),
    color: Colors.White,
    minWidth: '40%',
    textAlign: 'center',
    fontSize: hp(2.1),
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
  forgotPassText: {
    marginTop: hp(-0.5),
    marginRight: wp(1),
    fontSize: hp(1.9),
    textAlign: 'right',
    fontWeight: '600',
  },
  loginMobileMobileTitle: {
    marginBottom: hp(3),
    marginTop: hp(1),
    fontSize: hp(3),
    fontWeight: '600',
    textAlign: 'center',
  },
  modleTitliInput: {
    fontSize: hp(2),
    paddingLeft: wp(1),
    fontWeight: '600',
  },
  modalContentMoble: {
    width: '100%',
    alignSelf: 'center',
    padding: wp(4),
    borderRadius: wp(2),
    position: 'absolute',
    bottom: hp(0),
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    borderWidth: wp(0.3),
    borderBottomWidth: wp(0),
  },
});
