import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AppWapper from '../../Components/AppWapper';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import HeaderCom from '../../Components/HeaderCom';
import StatusBarCom from '../../Components/StatusBarCom';
import {ThemeContext} from '../../Theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = ({navigation}) => {
  const {currentTheme} = useContext(ThemeContext);
   const {t} = useTranslation();
  return (
    <AppWapper>
      <StatusBarCom backgroundColor={Colors.Black} barStyle={'light-content'} />
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('PrivacyPolicy')}
      />
      <ScrollView
        style={[
          styles.contianer,
          {backgroundColor: currentTheme.backgroundColor},
        ]}>
        <Text style={styles.policyTitle}>Lorem Lyupsem</Text>
        <Text
          style={[
            styles.policyTitle,
            styles.policyPara,
            {color: currentTheme.textColor},
          ]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac
          diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a
          scelerisque neque, sed accumsan metus. Nunc auctor tortor in dolor
          luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at
          rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros
          semper ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices
          ex placerat. Mauris ut lacinia justo, sed suscipit tortor. Nam egestas
          nulla posuere neque tincidunt porta.
        </Text>
        <Text style={styles.policyTitle}>terms & conditions</Text>
        <Text
          style={[
            styles.policyTitle,
            styles.policyPara,
            {color: currentTheme.textColor},
          ]}>
          <Text
            style={[
              styles.policyPara,
              styles.countNo,
              {color: currentTheme.textColor},
            ]}>
            1.
          </Text>{' '}
          Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada
          eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex
          nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis
          rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget
          rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus
          ac turpis.
        </Text>
        <Text
          style={[
            styles.policyTitle,
            styles.policyPara,
            {color: currentTheme.textColor},
          ]}>
          <Text
            style={[
              styles.policyPara,
              styles.countNo,
              {color: currentTheme.textColor},
            ]}>
            2.
          </Text>{' '}
          Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada
          eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex
          nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis
          rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget
          rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus.
        </Text>
        <Text
          style={[
            styles.policyTitle,
            styles.policyPara,
            {color: currentTheme.textColor},
          ]}>
          <Text
            style={[
              styles.policyPara,
              styles.countNo,
              {color: currentTheme.textColor},
            ]}>
            3.
          </Text>{' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac
          diam quam. Aenean in sagittis magna, ut feugiat diam.
        </Text>
        <Text
          style={[
            styles.policyTitle,
            styles.policyPara,
            {color: currentTheme.textColor},
          ]}>
          <Text
            style={[
              styles.policyPara,
              styles.countNo,
              {color: currentTheme.textColor},
            ]}>
            4.
          </Text>{' '}
          Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt.
          Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus. Morbi
          pellentesque malesuada eros semper ultrices. Vestibulum lobortis enim
          vel neque auctor, a ultrices ex placerat. Mauris ut lacinia justo, sed
          suscipit tortor. Nam egestas nulla posuere neque.
        </Text>
        <Text
          style={[
            styles.footer,
            {backgroundColor: currentTheme.backgroundColor},
          ]}
        />
      </ScrollView>
    </AppWapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: wp(4),
    backgroundColor: Colors.Black,
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
