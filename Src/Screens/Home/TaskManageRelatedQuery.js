import {
  Alert,
  BackHandler,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useReducer, useState} from 'react';
import Colors from '../../Constants/Colors';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../Constants/ImagePath';
import {hp, wp} from '../../Constants/Responsive';
import VectorIcon from '../../Constants/VectorIcon';
import StatusBarCom from '../../Components/StatusBarCom';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Fonts from '../../Constants/Fonts';
import TaskManageChat from '../../Components/TaskManageChat';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import {ThemeContext} from '../../Theme/ThemeContext';
import {ToastCom} from '../../Components/ToastCom';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ScreensName from '../../Navigations/ScreensName';
import AllTask from '../../Components/AllTask';

const TaskManageRelatedQuery = ({route}) => {
  const navigation = useNavigation();
  const {currentTheme} = useContext(ThemeContext);
  const {dataParams} = route?.params;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const[updateStatus,setUpdateStatus]=useState('')
  const [getAllTask,setGetAllTask]=useState('')
// console.log('pppoocsoococnc....', getAllTask)
// const filteredData = getAllTask.filter(item => item._id === dataParams._id);
const filteredData = Array.isArray(getAllTask) && getAllTask.length > 0
  ? getAllTask.filter(item => item._id === dataParams._id)
  : []; 
// console.log('filteredData................dddd..',filteredData);
  useEffect(() => {
    _getUserAllTaskApi();
  }, []);
  const _pamrod = () => {
    _getUserAllTaskApi();
  };

  const _getUserAllTaskApi = async () => {
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
      ToastCom({type: 'success', text2: result?.message});
      // console.log('parmoddd......',result?.data)
      setGetAllTask(result?.data)
      // setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
      ToastCom({type: 'error', text2: result?.message});
    }
  };





  
  const toggleCollapse = index => {
    setUpdateStatus(index)
    setIsCollapsed(!isCollapsed);
    _updateTaskStatus()
  };
  const _updateTaskStatus = async () => {
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    // console.log('parmodd....9999999999999999',updateStatus)
    try {
      const url = `${ApiUrl.UpdateTaskStatusApi}`;
      const updatedData = {
        taskId: dataParams._id,
        status:updateStatus,
      };
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // setUpdateStatus('')
      // navigation.goBack();
      ToastCom({type: 'success', text2: response?.data?.message});
    } catch (err) {
      ToastCom({type: 'error', text2: response?.data?.message});
    }
  };
  // // page reload for updated data calling  focuse Api  Start
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // _getUserAllTaskApi();
        return false;
      },
    );
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      // _getUserAllTaskApi();
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
      // _getUserAllTaskApi();
      return;
    }, []),
  );
  // // page reload for updated data calling  focuse Api  End

  return (
    <View style={{flex: 1, backgroundColor: currentTheme.backgroundColor}}>
      <StatusBarCom
        backgroundColor={currentTheme.backgroundColor}
        barStyle={'dark-content'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            // onRefresh={_getUserAllTaskApi}
            onRefresh={_pamrod}
          />
        }>
        <View
          style={{
            backgroundColor: currentTheme.backgroundColor,
            flex: isCollapsed == false ? 0.7 : 0.48,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: wp(2),
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreensName.BOTTOMNAVIGATION);
              }}>
              <VectorIcon
                type={'Ionicons'}
                name={'chevron-back-outline'}
                color={currentTheme.textColor}
                size={40}
                style={styles.vactorIcon}
              />
            </TouchableOpacity>
            <View style={{width: wp(40), height: wp(10)}}>
              <FastImage
                source={ImagePath.GroupImg}
                style={{width: '100%', height: '100%'}}
                resizeMode="center"
              />
            </View>
          </View>
          <View style={{paddingHorizontal: wp(4), marginTop: hp(1)}}>
            <Text
              style={{
                color: currentTheme.textColor,
                fontSize: hp(2.3),
                fontFamily: Fonts.InterBold700,
              }}>
              {dataParams?.taskTittle
                ? dataParams?.taskTittle
                : 'Not Task Title Found'}
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
                {dataParams?.priority
                  ? dataParams?.priority
                  : 'Task Priority Not Found.'}
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
              {moment(dataParams?.startDate).format('DD-MMMM-YYYY')
                ? moment(dataParams?.startDate).format('DD-MMMM-YYYY')
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
              {moment(dataParams?.dueDate).format('DD-MMMM-YYYY')
                ? moment(dataParams?.dueDate).format('DD-MMMM-YYYY')
                : 'No End Date Found'}
            </Text>

            <Text style={{color: currentTheme.textColor, fontSize: hp(2)}}>
              Status :{' '}
              <Text style={{color: 'green', fontWeight: '700'}}>
                {dataParams?.status}
              </Text>
            </Text>
            <Text
              style={{
                color: currentTheme.textColor,
                fontSize: hp(1.8),
                fontFamily: Fonts.InterMedium500,
                marginTop: hp(1.2),
              }}
              numberOfLines={3}>
              Short Description: {'\n'}
              {dataParams?.description
                ? dataParams?.description
                : 'No Description Found.'}{' '}
            </Text>
          </View>
        </View>

        {/* Buttotn Update work heree... */}
        <TouchableOpacity 
        activeOpacity={.8}
          style={[styles.updateTaskStausBtn,{
            borderBottomStartRadius:isCollapsed ==false ?wp(0): wp(2),
            borderBottomEndRadius:isCollapsed ==false ?wp(0): wp(2),
            backgroundColor:
            updateStatus == 'InProcess'
                ? Colors.Primary
                : updateStatus == 'Completed'
                ? 'green'
                :Colors.BlackOpactiy,
          }
        ]}
          onPress={() => toggleCollapse()}>
            {/* {
              console.log('parmodd....',updateStatus)
            } */}
          {
            !updateStatus?
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',}}>
          <Text style={[styles.updateTaskStausTitle,{}]}>Update Task Status</Text>
          <VectorIcon
            type={'Ionicons'}
            name={'chevron-down'}
            color={currentTheme.textColor}
            size={30}
            style={[styles.vactorIcon, {marginTop: hp(0.6)}]}
          />
            </View>:
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'99.9%'}}>
             <Text style={[styles.updateTaskStausTitle,{
               color:
               updateStatus == 'InProcess'
               ? Colors.White
               : updateStatus == 'Completed'
               ? Colors.White
             :Colors.Black,
             }]}>{updateStatus}</Text>
             <VectorIcon
               type={'Ionicons'}
               name={'chevron-up'}
               color={
                currentTheme.textColor
              }
               size={30}
               style={[styles.vactorIcon, {marginTop: hp(0.6),}]}
             />
               </View>
          }
        </TouchableOpacity>

        <Collapsible 
          style={styles.updateTaskStausBtnCollapsible}
        collapsed={isCollapsed
          //  !== item.index
           }>
          <View style={{marginTop:isCollapsed==false?hp(-1):null}}>
            <Text onPress={() => toggleCollapse('InProcess')} style={[styles.updateTaskStausTitle,{borderBottomWidth:wp(.5),borderTopWidth:wp(.5),paddingVertical:hp(1)}]}>InProcess</Text>
            <Text onPress={() => toggleCollapse('Completed')} style={[styles.updateTaskStausTitle,{paddingVertical:hp(1)}]}>Completed</Text>
          </View>
        </Collapsible>
      </ScrollView>

        <View
          style={{
            backgroundColor: currentTheme.backgroundColor,
            // flex: 0.9,
            paddingBottom: hp(0),
          }}>
          <TaskManageChat dataParams={dataParams}  filteredData={filteredData || []}/>
        </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default TaskManageRelatedQuery;
const styles = StyleSheet.create({
  updateStateBtn: {
    alignSelf: 'center',
    margin: wp(4),
    borderWidth: wp(0.3),
    width: wp(75),
    padding: wp(2),
    paddingVertical: wp(2.3),
    fontWeight: '600',
    fontSize: hp(2),
  },
  updateStateBtnTxt: {
    fontWeight: '600',
    fontSize: hp(2),
    width: wp(60),
  },
  inProcessCompleBtn: {
    marginVertical: hp(1),
    width: '40%',
    borderRadius: wp(2),
    fontSize: hp(1.8),
    textAlign: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    color: Colors.White,
    letterSpacing: wp(0.3),
    fontWeight: '600',
  },
  updateTaskStausBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: wp(4),
    padding: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    backgroundColor: Colors.BlackOpactiy,
    marginBottom:hp(0),
  },
  updateTaskStausTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
  },
  updateTaskStausBtnCollapsible:{
    padding: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    backgroundColor: Colors.BlackOpactiy,
    marginHorizontal: wp(4),
    borderTopStartRadius:wp(0),
    borderEndStartRadius:wp(0)

  }
});
