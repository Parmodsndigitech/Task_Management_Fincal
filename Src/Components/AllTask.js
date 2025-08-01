import {
  BackHandler,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ImagePath from '../Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../Utils/apiurl';
import {ToastCom} from './ToastCom';
import moment from 'moment';
import ScreensName from '../Navigations/ScreensName';
import {ThemeContext} from '../Theme/ThemeContext';
import {useTranslation} from 'react-i18next';
// const tabsData = [
//   {
//     id: 1,
//     name: `${t('InProcessTask')}` ,
//   },
//   {
//     id: 2,
//     name: `${t('CompletedTask')}` ,
//   },
//   {
//     id: 3,
//     name: `${t('InCompleteTask')}` ,
//   },
// ];
// const {t} = useTranslation();
const AllTask = () => {
  const {t} = useTranslation();
  const tabsData = [
    {
      id: 1,
      name: `${t('InProcessTask')}`,
    },
    {
      id: 2,
      name: `${t('CompletedTask')}`,
    },
    {
      id: 3,
      name: `${t('InCompleteTask')}`,
    },
  ];
  const {currentTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isTabUnderlineBution, setIsTabUnderlineButton] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);
  // get user profile data Api
  useEffect(() => {
    _getUserAllTaskApi();
  }, []);
  const _getUserAllTaskApi = async () => {
    setLoading(true);
    setIsRefreshing(true);
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
      const response = await fetch(ApiUrl.getUserAllTaskApi, {
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
      setData(result?.data);
      ToastCom({type: 'success', text2: result?.message});
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      ToastCom({type: 'error', text2: result?.message});
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsTabUnderlineButton(index);
          }}
          activeOpacity={0.7}
          style={[
            styles.tabBtnContainer,
            {
              borderColor:
                isTabUnderlineBution == index
                  ? Colors.Primary
                  : Colors.BlackOpactiyTxt,
            },
          ]}>
          <Text
            style={[
              styles.tabBtnContainerText,
              {
                fontFamily: Fonts.InterMedium500,
                fontSize: hp(1.7),
                color: currentTheme.textColor,

                color:
                  isTabUnderlineBution == index
                    ? Colors.Primary
                    : Colors.BlackOpactiyTxt,

                fontWeight: isTabUnderlineBution == index ? '700' : null,
              },
            ]}>
            {' '}
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem_InProcessTask = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(ScreensName.TASKMANAGERELATEDQUERY, {
            dataParams: item,
          })
        }
        style={{
          width: '96%',
          padding: wp(2),
          borderRadius: wp(2),
          marginBottom: hp(1.5),
          borderWidth: wp(0.3),
          borderColor:
            item?.color === 'Red'
              ? 'red'
              : item?.color === 'Green'
              ? 'green'
              : item?.color === 'Blue'
              ? 'blue'
              : item?.color === 'Yellow'
              ? 'yellow'
              : item?.color === 'Pink'
              ? 'pink'
              : Colors.Black,
          backgroundColor:
            item?.color === 'Red'
              ? 'rgba(255, 0, 0, .3)'
              : item?.color === 'Green'
              ? 'rgba(0, 255, 0, .3)'
              : item?.color === 'Blue'
              ? 'rgba(0, 0, 255, .3)'
              : item?.color === 'Yellow'
              ? 'rgba(255, 255, 0, .3)'
              : item?.color === 'Pink'
              ? 'rgba(255, 105, 180, .3)'
              : Colors.Primary,
        }}>
        <Text
          style={{
            color: currentTheme.textColor,
            fontSize: hp(2),
            fontFamily: Fonts.InterBold700,
          }}>
          {item?.taskTittle ? item?.taskTittle : 'Title Not Found.'}
        </Text>
        <Text
          style={{
            color: currentTheme.textColor,
            fontSize: hp(1.8),
            fontFamily: Fonts.InterRegular400,
          }}
          numberOfLines={2}>
          {item?.description ? item?.description : 'No Description Found.'}{' '}
        </Text>
        <Text
          style={{
            width: '100%',
            backgroundColor: currentTheme.textColor,
            height: hp(0.1),
            marginVertical: hp(1.5),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterBold700,
            }}>
            {moment(item?.startDate).format('DD-MMMM-YYYY')
              ? moment(item?.startDate).format('DD-MMM-YYYY')
              : 'No End Date Found'}{' '}
            To{' '}
            {moment(item?.dueDate).format('DD-MMM-YYYY')
              ? moment(item?.dueDate).format('DD-MMM-YYYY')
              : 'No End Date Found'}
          </Text>
          <View style={{width: wp(20), height: wp(5)}}>
            <FastImage
              source={ImagePath.GroupImg}
              style={{width: '100%', height: '100%'}}
              resizeMode="center"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const filteredInProcessTask = data.filter(
    item => item.status === 'InProcess',
  );
  const renderItem_CompletedTask = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={()=>navigation.navigate(ScreensName.TASKMANAGERELATEDQUERY,{dataParams:item })}
        style={{
          width: '96%',
          padding: wp(2),
          borderRadius: wp(2),
          marginBottom: hp(1.5),
          borderWidth: wp(0.3),
          borderColor:
            item?.color === 'Red'
              ? 'red'
              : item?.color === 'Green'
              ? 'green'
              : item?.color === 'Blue'
              ? 'blue'
              : item?.color === 'Yellow'
              ? 'yellow'
              : item?.color === 'Pink'
              ? 'pink'
              : Colors.Black,
          backgroundColor:
            item?.color === 'Red'
              ? 'rgba(255, 0, 0, .3)'
              : item?.color === 'Green'
              ? 'rgba(0, 255, 0, .3)'
              : item?.color === 'Blue'
              ? 'rgba(0, 0, 255, .3)'
              : item?.color === 'Yellow'
              ? 'rgba(255, 255, 0, .3)'
              : item?.color === 'Pink'
              ? 'rgba(255, 105, 180, .3)'
              : Colors.Primary,
        }}>
        <Text
          style={{
            color: currentTheme.textColor,
            fontSize: hp(2),
            fontFamily: Fonts.InterBold700,
          }}>
          {item?.taskTittle ? item?.taskTittle : 'Title Not Found.'}
        </Text>
        <Text
          style={{
            color: currentTheme.textColor,
            fontSize: hp(1.8),
            fontFamily: Fonts.InterRegular400,
          }}
          numberOfLines={2}>
          {item?.description ? item?.description : 'No Description Found.'}{' '}
        </Text>
        <Text
          style={{
            width: '100%',
            backgroundColor: currentTheme.textColor,
            height: hp(0.1),
            marginVertical: hp(1.5),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterBold700,
            }}>
            {moment(item?.startDate).format('DD-MMMM-YYYY')
              ? moment(item?.startDate).format('DD-MMM-YYYY')
              : 'No End Date Found'}{' '}
            To{' '}
            {moment(item?.dueDate).format('DD-MMM-YYYY')
              ? moment(item?.dueDate).format('DD-MMM-YYYY')
              : 'No End Date Found'}
          </Text>
          <View style={{width: wp(20), height: wp(5)}}>
            <FastImage
              source={ImagePath.GroupImg}
              style={{width: '100%', height: '100%'}}
              resizeMode="center"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const filteredCompletedTask = data.filter(
    item => item.status === 'Completed',
  );
  const renderItem_InCompleteTask = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={()=>navigation.navigate(ScreensName.TASKMANAGERELATEDQUERY,{dataParams:item })}
        style={{
          width: '96%',
          padding: wp(2),
          borderRadius: wp(2),
          marginBottom: hp(1.5),
          borderWidth: wp(0.3),
          borderColor:
            item?.color === 'Red'
              ? 'red'
              : item?.color === 'Green'
              ? 'green'
              : item?.color === 'Blue'
              ? 'blue'
              : item?.color === 'Yellow'
              ? 'yellow'
              : item?.color === 'Pink'
              ? 'pink'
              : Colors.Black,
          backgroundColor:
            item?.color === 'Red'
              ? 'rgba(255, 0, 0, .3)'
              : item?.color === 'Green'
              ? 'rgba(0, 255, 0, .3)'
              : item?.color === 'Blue'
              ? 'rgba(0, 0, 255, .3)'
              : item?.color === 'Yellow'
              ? 'rgba(255, 255, 0, .3)'
              : item?.color === 'Pink'
              ? 'rgba(255, 105, 180, .3)'
              : Colors.Primary,
        }}>
        <Text
          style={{
            color: currentTheme.textColor,
            fontSize: hp(2),
            fontFamily: Fonts.InterBold700,
          }}>
          {item?.taskTittle ? item?.taskTittle : 'Title Not Found.'}
        </Text>
        <Text
          style={{
            color: currentTheme.textColor,
            fontSize: hp(1.8),
            fontFamily: Fonts.InterRegular400,
          }}
          numberOfLines={2}>
          {item?.description ? item?.description : 'No Description Found.'}{' '}
        </Text>
        <Text
          style={{
            width: '100%',
            backgroundColor: currentTheme.textColor,
            height: hp(0.1),
            marginVertical: hp(1.5),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterBold700,
            }}>
            {moment(item?.startDate).format('DD-MMMM-YYYY')
              ? moment(item?.startDate).format('DD-MMM-YYYY')
              : 'No End Date Found'}{' '}
            To{' '}
            {moment(item?.dueDate).format('DD-MMM-YYYY')
              ? moment(item?.dueDate).format('DD-MMM-YYYY')
              : 'No End Date Found'}
          </Text>
          <View style={{width: wp(20), height: wp(5)}}>
            <FastImage
              source={ImagePath.GroupImg}
              style={{width: '100%', height: '100%'}}
              resizeMode="center"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const filteredInCompleteTask = data.filter(item => item.status === 'Incomplete');




  // page reload for updated data calling  focuse Api  Start
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        _getUserAllTaskApi();
        return false;
      },
    );
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      _getUserAllTaskApi();
      Alert.alert('Confirm exit', 'Do you want to go back?', [
        {text: 'Cancel', style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    return () => {
      backHandler.remove();
      navigation.removeListener('beforeRemove');
    };
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      _getUserAllTaskApi();
      return;
    }, []),
  );
  // page reload for updated data calling  focuse Api  End


  return (
    <View
      style={[
        styles.contianer,
        {backgroundColor: currentTheme.backgroundColor},
      ]}>
      <FlatList
        data={tabsData}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {isTabUnderlineBution == 0 ? (
        <FlatList
          data={filteredInProcessTask}
          keyExtractor={item => item._id}
          renderItem={renderItem_InProcessTask}
          contentContainerStyle={{paddingBottom: hp(25)}}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_getUserAllTaskApi}
            />
          }
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  color: Colors.BlackOpactiyTxt,
                }}>
                {t('NoInProcessFound')} 🔍
              </Text>
            </View>
          )}
        />
      ) : null}
      {isTabUnderlineBution == 1 ? (
        <FlatList
          data={filteredCompletedTask}
          keyExtractor={item => item?._id}
          renderItem={renderItem_CompletedTask}
          contentContainerStyle={{paddingBottom: hp(25)}}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_getUserAllTaskApi}
            />
          }
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  color: Colors.BlackOpactiyTxt,
                }}>
                {t('NoCompletedFound!')} 🔍
              </Text>
            </View>
          )}
        />
      ) : null}
      {isTabUnderlineBution == 2 ? (
        <FlatList
          data={filteredInCompleteTask}
          keyExtractor={item => item?._id}
          renderItem={renderItem_InCompleteTask}
          contentContainerStyle={{paddingBottom: hp(25)}}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_getUserAllTaskApi}
            />
          }
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  color: Colors.BlackOpactiyTxt,
                }}>
                {t('NoInCompleteFound')} 🔍
              </Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

export default AllTask;

const styles = StyleSheet.create({
  contianer: {
    width: '100%',
    paddingLeft: wp(3),
    marginTop: hp(2),
    paddingBottom: hp(10),
  },
  tabBtnContainer: {
    marginBottom: hp(3),
    paddingBottom: hp(1),
    width: wp(31),
    borderBottomWidth: wp(0.5),
    borderBottomColor: Colors.skyBlue,
    // backgroundColor:'red'
    height: hp(4),
  },
  tabBtnContainerText: {
    textAlign: 'center',
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
    color: Colors.skyBlue,
  },
});
