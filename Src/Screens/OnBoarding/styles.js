import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import { useContext } from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.Black,
    paddingHorizontal: wp(4),
  },
  skipBtn: {
    flex: 0.2,
  },
  skipTitle: {
    fontSize: hp(2),
    fontFamily: Fonts.InterBold700,
    color: Colors.White,
    alignSelf: 'flex-end',
    padding: wp(2),
    paddingRight: wp(-2),
  },
  imgContianer: {
    flex: 0.4,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: wp(2),
  },
  splashImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  textContent: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: hp(-3),
  },
  OnBoardingContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  OnBoardingTitleOne: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  OnBoardingParaOne: {
    color: Colors.White,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.5),
    textAlign: 'center',
    textTransform: 'capitalize',
    width: wp(80),
    marginTop: hp(2),
  },
  dottedContianer: {flexDirection: 'row', alignSelf: 'center'},
  dotted: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(2.5),
    backgroundColor: Colors.White,
    marginTop: hp(1),
  },
  propsContainer: {
    backgroundColor: Colors.Transplant,
    marginBottom: hp(2),
    marginTop: hp(-1),
  },
    propsLabel: {color: Colors.BlackOpacity, fontSize: hp(2.2)},
});

export default styles;
