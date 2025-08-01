import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Linking,
  RefreshControl,
  Alert,
  BackHandler,
  Button,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AppWapper from '../../Components/AppWapper';
import Colors from '../../Constants/Colors';
import StatusBarCom from '../../Components/StatusBarCom';
import {hp, wp} from '../../Constants/Responsive';
import VectorIcon from '../../Constants/VectorIcon';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../Constants/ImagePath';
import Fonts from '../../Constants/Fonts';
import {Calendar} from 'react-native-calendars';
import LoaderCom from '../../Components/LoaderCom';
import Collapsible from 'react-native-collapsible';
import ScreensName from '../../Navigations/ScreensName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastCom} from '../../Components/ToastCom';
import {ApiUrl} from '../../Utils/apiurl';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {ThemeContext} from '../../Theme/ThemeContext';
import {useTranslation} from 'react-i18next';
import RNFetchBlob from 'rn-fetch-blob';
import InAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';

const inAppUpdates = new InAppUpdates(false); // isDebug: false
export const checkForMandatoryUpdate = async () => {
  try {
    const result = await inAppUpdates.checkNeedsUpdate();
    if (result.shouldUpdate) {
      if (Platform.OS === 'android') {
        inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.IMMEDIATE,
        });
      } else {
        // iOS Alert
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                // Redirect to App Store
                Linking.openURL('https://apps.apple.com/app/idYOUR_APP_ID');
                BackHandler.exitApp();
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  } catch (error) {
    // console.log('Update check error:', error);  you can uncommit this

    // Handle case when Google Play blocks install due to battery/disk (error -6)
    if (Platform.OS === 'android') {
      // Alert.alert(
      //   'Cannot Update Now',
      //   'Please check your battery level or storage. The update cannot proceed.',
      //   [{text: 'Exit', onPress: () => BackHandler.exitApp()}],
      //   {cancelable: false},
      // );
    }
  }
};
// #################################################
const Home = ({navigation}) => {
  const {currentTheme} = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [userProfileData, setUserProfileData] = useState('');
  const [data, setData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentDateTasks, setCurrentDateTasks] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dottedLoader, setDottedLoader] = useState(false);
  const {t} = useTranslation();

  // $%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // Check If any Update ************** START
  useEffect(() => {
    checkForMandatoryUpdate();
  }, []);
  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // useEffect to filter tasks for the current date
  useEffect(() => {
    const today = getCurrentDate();
    setSelectedDate(today);

    // Filter tasks for the current date based on taskDate or dueDate
    const todayTasks = data.filter(
      task =>
        task.taskDate.slice(0, 10) === today ||
        task.dueDate.slice(0, 10) === today,
    );
    setFilteredTasks(todayTasks.length > 0 ? todayTasks : []);
    setCurrentDateTasks(todayTasks);
  }, []);

  // Handle the day selection (for both start and end date)
  const handleDayPress = day => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);
    const filtered =
      data && Array.isArray(data)
        ? data.filter(task => {
            const taskStartDate = task.taskDate.slice(0, 10); // Get task start date (YYYY-MM-DD)
            const taskDueDate = task.dueDate.slice(0, 10); // Get task due date (YYYY-MM-DD)
            return selectedDate >= taskStartDate && selectedDate <= taskDueDate;
          })
        : [];
    setFilteredTasks(filtered);
    setShowCalendar(false);
  };

  // 5555555555555555555555555555555

  const toggleCollapse = id => {
    setExpandedIndex(expandedIndex === id ? null : id);
  };
  // get user profile data Api
  useEffect(() => {
    _getUserProfileDetails();
    _getUserAllTaskApi();
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
  // const url = 'https://gbihr.org/images/docs/test.pdf';
  const downloadPdf = async fileUrl => {
    // console.log('pamrod...suimitttt',fileUrl)
    setLoading(true);
    const {config, fs} = RNFetchBlob;
    const downloadPath = fs.dirs.DownloadDir;
    const filePath = `${downloadPath}/Task_Management_${Math.random()}.pdf`;

    try {
      console.log('Starting download...');
      setDottedLoader(true);
      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading PDF file',
        },
      }).fetch('GET', fileUrl);
      // console.log('Download Success:', res.path());
      alert('PDF Downloaded Successfully');
      setDottedLoader(false);
    } catch (e) {
      console.error('Error downloading PDF:', e);
      alert('Failed to download PDF');
    } finally {
      setLoading(false);
    }
  };
  // page reload for updated data calling  focuse Api  Start
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        _getUserAllTaskApi();
        _getUserProfileDetails();
        return false;
      },
    );
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      _getUserAllTaskApi();
      _getUserProfileDetails();
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
      _getUserProfileDetails();
      return;
    }, []),
  );
  // page reload for updated data calling  focuse Api  End
  useEffect(() => {
    checkForMandatoryUpdate();
  }, []);
  const renderItem = ({item}) => (
    <View style={{}}>
      <View
        style={[
          styles.detailsContainer,
          {
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
                : Colors.skyBlue,
          },
          {borderBottomLeftRadius: expandedIndex !== item._id ? null : 0},
          {borderBottomRightRadius: expandedIndex !== item._id ? null : 0},
        ]}>
        <View></View>
        <View
          style={[
            styles.detailsContainerinsideRight,
            {width: '97%', backgroundColor: null},
          ]}>
          <Text
            style={[
              styles.eventDetails,
              {fontSize: hp(2.3), width: '80%', color: currentTheme.textColor},
            ]}
            numberOfLines={1}>
            {item?.taskTittle ? item?.taskTittle : 'Title Not Found.'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => Linking.openURL(`${item?.fileAttachment}`)}
            >
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'file-pdf-box'}
                color={'red'}
                size={35}
                style={[styles.vactorIcon, {marginRight: wp(2)}]}
              />
            </TouchableOpacity>
            <View
              style={{
                marginLeft: wp(-5),
                marginTop: hp(-0.5),
                backgroundColor: Colors.White,
                width: wp(5),
                height: wp(5),
                borderRadius: wp(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.Black,
                  fontWeight: '700',
                  fontSize: hp(1.5),
                }}>
                {item.fileAttachments.length}
              </Text>
            </View>

            <TouchableOpacity
              style={{marginLeft: wp(1)}}
              activeOpacity={0.8}
              onPress={() => toggleCollapse(item._id)}>
              {expandedIndex !== item._id ? (
                <VectorIcon
                  type={'Ionicons'}
                  name={'chevron-down'}
                  color={currentTheme.textColor}
                  size={30}
                  style={[styles.vactorIcon, {marginTop: hp(0.6)}]}
                />
              ) : (
                <VectorIcon
                  type={'Ionicons'}
                  name={'chevron-up'}
                  color={currentTheme.textColor}
                  size={30}
                  style={styles.vactorIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Collapsible collapsed={expandedIndex !== item._id}>
        <View
          style={{
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
                : Colors.skyBlue,
            borderRadius: wp(3),
            padding: wp(2),
            marginHorizontal: wp(1.5),
            marginTop: hp(-2),
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: wp(5),
          }}>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2.3),
              fontFamily: Fonts.InterMedium500,
              marginVertical: hp(1),
            }}
            numberOfLines={3}>
            {item?.taskTittle ? item?.taskTittle : 'Title Not Found.'}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterMedium500,
            }}
            numberOfLines={3}>
            Task Priority :{' '}
            <Text style={{color: 'red', fontFamily: Fonts.InterMedium500}}>
              {item?.priority ? item?.priority : 'Task Priority Not Found.'}
            </Text>
          </Text>

          <Text
            style={{
              color: 'red',
              fontSize: hp(2),
              fontFamily: Fonts.InterMedium500,
            }}>
            <Text
              style={{
                color: currentTheme.textColor,
                fontFamily: Fonts.InterMedium500,
              }}>
              Start Date :
            </Text>{' '}
            {moment(item?.startDate).format('DD-MMMM-YYYY')
              ? moment(item?.startDate).format('DD-MMMM-YYYY')
              : 'No Start Date Found'}
          </Text>

          <Text
            style={{
              color: 'red',
              fontSize: hp(2),
              fontFamily: Fonts.InterMedium500,
            }}>
            <Text
              style={{
                color: currentTheme.textColor,
                fontFamily: Fonts.InterMedium500,
              }}>
              End Date :
            </Text>{' '}
            {moment(item?.dueDate).format('DD-MMMM-YYYY')
              ? moment(item?.dueDate).format('DD-MMMM-YYYY')
              : 'No End Date Found'}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(1.8),
              fontFamily: Fonts.InterBold700,
              marginTop: hp(2),
            }}>
            {item?.description ? item?.description : 'No Description Found.'}{' '}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterBold700,
              marginTop: hp(2),
              marginBottom: hp(0.5),
            }}>
            Attachments
          </Text>

          {item.fileAttachments && item.fileAttachments.length > 0 ? (
            item.fileAttachments.map((fileUrl, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => downloadPdf(fileUrl)}
                activeOpacity={0.8}
                style={[
                  styles.pdfBtn,
                  {
                    paddingVertical: hp(0.5),
                    borderRadius: wp(2),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}>
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <VectorIcon
                      type={'MaterialCommunityIcons'}
                      name={'file-pdf-box'}
                      color={'red'}
                      size={40}
                      style={styles.vactorIcon}
                    />
                    <View>
                      <Text
                        style={[
                          styles.titlePdf,
                          {
                            width: item?.fileAttachment ? '30%' : '100%',
                            color: currentTheme.textColor,
                          },
                        ]}>
                        Download PDF {index + 1}
                      </Text>
                    </View>
                  </View>
                </View>
                <VectorIcon
                  type={'MaterialIcons'}
                  name={'download'}
                  color={currentTheme.textColor}
                  size={25}
                  style={styles.vactorIcon}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{color: currentTheme.textColor}}>
              No files to download
            </Text>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreensName.TASKMANAGERELATEDQUERY, {
                dataParams: item,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.viewMoreText}>View Detailed Task</Text>
            <VectorIcon
              type={'AntDesign'}
              name={'arrowright'}
              color={'#8a62fe'}
              size={25}
              style={[styles.vactorIcon]}
            />
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
  return (
    <AppWapper containerProps={{backgroundColor: currentTheme.backgroundColor}}>
      <StatusBarCom backgroundColor={Colors.Black} barStyle={'light-content'} />
      {/* Header Start */}
      <View
        style={[
          styles.headerContianer,
          {backgroundColor: currentTheme.backgroundColor},
        ]}>
        <View style={[styles.headerInnerContianer, {}]}>
          {userProfileData?.profilePicture ? (
            <View
              style={[
                styles.vactorIcon,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: wp(10.5),
                  width: wp(10.5),
                  borderRadius: wp(10.5),
                  backgroundColor: Colors.Primary,
                },
              ]}>
              <FastImage
                source={{uri: userProfileData?.profilePicture}}
                style={[
                  styles.vactorIcon,
                  {
                    height: wp(10),
                    width: wp(10),
                    borderRadius: wp(10),
                  },
                ]}
              />
            </View>
          ) : (
            <VectorIcon
              type={'FontAwesome'}
              name={'user-circle-o'}
              color={currentTheme.textColor}
              size={40}
              style={styles.vactorIcon}
            />
          )}
          <View style={{marginLeft: wp(1.5)}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.hiiTxt,
                  {fontSize: hp(2.2), color: currentTheme.textColor},
                ]}>
                {t('hiiUser')}
              </Text>{' '}
              <FastImage
                source={ImagePath.HiiGif}
                style={styles.hiiGit}
                resizeMode="cover"
              />
            </View>
            <Text
              style={[
                styles.hiiTxt,
                {marginTop: hp(-0.8), color: currentTheme.textColor},
              ]}>
              {userProfileData?.name
                ? userProfileData?.name
                : `Tony Stark${' '}`}
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => alert('Alert')}>
          <VectorIcon
            type={'MaterialCommunityIcons'}
            name={'bell-badge-outline'}
            size={30}
            color={currentTheme.textColor}
            style={{alignItems: 'flex-end'}}
          />
        </TouchableOpacity> */}
      </View>
      {/* Header End */}

      <View style={{padding: wp(3)}}>
        <Text
          style={{
            fontSize: hp(2),
            color: currentTheme.textColor,
            fontWeight: '700',
            marginLeft: wp(1),
            marginBottom: hp(0.3),
          }}>
          {t('SelectDatefor')}
        </Text>
        {/* Calendar Button Start*/}
        <TouchableOpacity
          onPress={() => setShowCalendar(!showCalendar)}
          style={[
            styles.toggleButton,
            {borderColor: currentTheme.textColor, marginBottom: hp(1)},
          ]}>
          <View style={[styles.toggleInnerButton]}>
            <VectorIcon
              type={'Entypo'}
              name={'calendar'}
              color={currentTheme.textColor}
              size={20}
              style={styles.vactorIcon}
            />
            <Text
              style={[
                styles.toggleButtonText,
                {
                  marginLeft: wp(1),
                  fontWeight: '700',
                  marginTop: hp(0.2),
                  color: currentTheme.textColor,
                },
              ]}>
              {/* {selectedDate ? selectedDate : 'Task-Management'} */}
              {moment(selectedDate).format('YYYY')
                ? moment(selectedDate).format('DD-MMM-YYYY')
                : 'Task-Management'}
              {/* {moment(item?.startDate).format('YYYY')} */}
            </Text>
          </View>
          <View style={styles.toggleInnerButton}>
            <VectorIcon
              type={'Ionicons'}
              name={'chevron-down'}
              color={currentTheme.textColor}
              size={25}
              style={styles.vactorIcon}
            />
            <Text />
            <VectorIcon
              type={'Ionicons'}
              name={'chevron-up'}
              color={currentTheme.textColor}
              size={25}
              style={styles.vactorIcon}
            />
          </View>
        </TouchableOpacity>
        {/* Calendar Button End*/}
        {showCalendar && (
          <Calendar
            onDayPress={handleDayPress}
            monthFormat={'MMM yyyy'}
            markingType={'custom'}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: Colors.Primary,
                selectedTextColor: Colors.Black,
              },
            }}
            theme={{
              arrowColor: Colors.Primary,
              monthTextColor: Colors.Primary,
              textDayFontFamily: 'Arial',
              textMonthFontFamily: 'Georgia',
              textDayHeaderFontFamily: 'Times New Roman',
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'normal',
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
          />
        )}
        {/* {loading ? (
          <ActivityIndicator size="large" color={Colors.Primary} />
        ) : ( */}

        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks || []}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={{paddingBottom: hp(50)}}
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
                    fontSize: hp(2.5),
                    color: Colors.BlackOpactiyTxt,
                  }}>
                  No Tasks Found ! 🔍
                </Text>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.BlackOpactiyTxt,
                fontSize: hp(2),
                marginBottom: hp(1),
                marginTop: showCalendar == false ? hp(30) : hp(5),
              }}>
              {t('NotasksAvailableDate')}
            </Text>
            <View style={{width: wp(30), height: wp(20)}}>
              <FastImage
                source={ImagePath.NoDataFoundGif}
                style={{width: '100%', height: '100%'}}
                tintColor={Colors.BlackOpactiyTxt}
                resizeMode="center"
              />
            </View>
          </View>
        )}
        {/* )} */}
      </View>
      {dottedLoader && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 999,
          }}>
          <Text style={{color: Colors.White}}>Starting download...</Text>
          <FastImage
            source={ImagePath.DittedLoaderGif}
            style={{width: wp(50), height: wp(50)}}
            resizeMode="center"
          />
        </View>
      )}
    </AppWapper>
  );
};
export default Home;
const styles = StyleSheet.create({
  headerContianer: {
    backgroundColor: Colors.Black,
    width: '100%',
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  headerInnerContianer: {flexDirection: 'row', alignItems: 'center'},
  hiiTxt: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
  },
  hiiGit: {width: wp(9), height: wp(7), marginLeft: wp(-2), marginTop: hp(-1)},
  container: {
    padding: wp(4),
  },
  toggleButton: {
    borderWidth: wp(0.3),
    padding: wp(3),
    borderRadius: wp(3),
    borderColor: Colors.Black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: Colors.Black,
    fontSize: hp(2.2),
    textAlign: 'center',
  },
  calendarContainer: {
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  detailsContainer: {
    paddingLeft: wp(0),
    paddingRight: wp(3),
    backgroundColor: Colors.skyBlue,
    borderRadius: wp(2),
    shadowColor: '#000',
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(0.5),
  },
  detailsContainerinsideLeft: {
    width: '20%',
    borderRadius: wp(2),
    padding: wp(2),
  },
  detailsContainerinsideRight: {
    backgroundColor: 'rgba(229,224,255,1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: wp(2.5),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
  },
  eventTitle: {
    fontSize: hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eventDetails: {
    fontSize: hp(2),
    color: Colors.Black,
  },
  noEvent: {
    fontSize: hp(2.1),
    color: 'gray',
  },
  pdfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
    width: '100%',
  },
  titlePdf: {
    color: Colors.Black,
    fontSize: hp(2.2),
    fontFamily: Fonts.InterMedium500,
  },
  viewMoreText: {
    fontSize: hp(2),
    textAlign: 'center',
    fontFamily: Fonts.InterBold700,
    color: '#8a62fe',
    padding: wp(4),
  },
});
