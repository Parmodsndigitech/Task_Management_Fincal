import {
  ActivityIndicator,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import VectorIcon from '../Constants/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ShareSocialMediaCom from './ShareSocialMediaCom';
import {ThemeContext} from '../Theme/ThemeContext';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import ImagePath from '../Constants/ImagePath';
import {ApiUrl} from '../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastCom} from './ToastCom';
import { io } from 'socket.io-client';
import socketServcies from '../Utils/SocketService';
const socket = io("https://task.eltutor.in"); 

const tabsData = [
  {
    id: 0,
    name: 'Description',
  },
  {
    id: 1,
    name: 'Chat',
  },
  {
    id: 2,
    name: 'Attachment',
  },
  {
    id: 3,
    name: 'Activity',
  },
];
const TaskManageChat = ({dataParams, filteredData, userId, taskId }) => {
  const navigation = useNavigation();
  const [isTabUnderlineBution, setIsTabUnderlineButton] = useState([0]);
  const {currentTheme} = useContext(ThemeContext);
  const [dottedLoader, setDottedLoader] = useState(false);

// #####################################
 const [messages, setMessages] = useState([]);
const  [message, setMessage] = useState();
const [userProfileData,setUserProfileData]=useState('')
const [recevedChat,setRecevedChat]=useState('')

  const messagesEndRef = useRef(null);
    useEffect(() => {
      messagesEndRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(()=>{
      setMessage(message)
    },[[message]])

    useEffect(()=>{
      _GetEventById()
    },[dataParams?._id])

    const _GetEventById = async () => {
      if (dataParams?._id) {
        // setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
          const requestUrl = `${ApiUrl.ChatGetsApi}${dataParams?._id}`;
          const response = await axios.get(requestUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log('999999000000...kk.NEW.',response.data?.messages)
          setRecevedChat(response.data?.messages);
        } catch (err) {
          // console.error('Error:', err.response ? err.response.data : err.message);
        } finally {
          // setIsLoading(false);
        }
      } else {
        ToastCom({type: 'error', text2: ' something went wrong'});
      }
    };

    useEffect(() => {
      _getUserProfileDetails();
    }, []);
    const _getUserProfileDetails = async () => {
      // setLoading(true);
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
        setUserProfileData(result?.data?._id);
        // console.log('pamrodd',result?.data)
        ToastCom({type: 'success', text2: result?.message});
        // setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        ToastCom({type: 'error', text2: result?.message});
      }
    };
  


 

    {
      // console.log('pamordc......',dataParams)
    }

    const sendMessage = () => {
      // console.log('jncdjjcjccc..........',message)
      if (message) {
        const taskId =dataParams?._id
        const senderId = userProfileData;  
        socket.emit('send_task_message', {
           taskId,
           senderId,
           message,
        });
        setMessage('');
      }
    };


    useEffect(() => {
      socket.emit('join_task', { userId: userProfileData, taskId: dataParams?._id });
      // Listen for incoming messages
      socket.on('receive_task_message', (msg) => {
        console.log('📩 New Message Received:', msg);
        // setMessages((prevMessages) => [...prevMessages, msg]);
        setMessages(prevMessages => [msg, ...prevMessages]);
      });
    
      // Cleanup on component unmount
      return () => {
        socket.off('receive_task_message');
      };
    }, [userId, taskId]);



      const renderItemChat = ({ item }) => (
        <View style={[styles.messageContainer,{alignSelf:'flex-end',marginRight:wp(2),marginVertical:hp(1),backgroundColor:'rgba(138, 98, 254, .2)'}]}>
          <Text style={[styles.messageText,{textAlign:'right',}]}>{item.message}</Text>
        </View>
      );


      const renderItemRecevedChat = ({ item }) => (
        <View style={[{alignItems:'flex-start',marginLeft:wp(2),marginVertical:hp(1),}]}>
<Text style={{marginVertical:hp(.5)}}/>
          <Text style={[styles.messageText,styles.messageContainer,{textAlign:'right',}]}>{item.message}</Text>

          <View style={[{marginTop:hp(-.5),flexDirection:'row',alignItems:'center'}]}>
          <FastImage
                  source={{uri: item?.senderInfo?.profilePicture}}
                  style={[
                    styles.vactorIcon,
                    {
                      height: wp(6),
                      width: wp(6),
                      borderRadius: wp(6),
                    },
                  ]}
                  resizeMode="cover"
                />
                <View>

          <Text style={[styles.messageText,{textAlign:'right',fontSize:hp(1.5),marginLeft:wp(.5)}]}>{item?.senderInfo?.name}</Text>
          <Text style={[styles.messageText,{textAlign:'left',fontSize:hp(1.5),marginLeft:wp(.5)}]}>{''}{item?.senderInfo?.userId}</Text>
                </View>
          </View>

        </View>
      );





// ################################################





// get chat of user 








































  // const url = 'https://gbihr.org/images/docs/test.pdf';
  const downloadPdf = async fileUrl => {
    // setLoading(true);
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
                color:
                  isTabUnderlineBution == index
                    ? Colors.Primary
                    : Colors.BlackOpactiyTxt,
              },
            ]}>
            {' '}
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Activity Status Api for Update Client Status...
  const renderItemActivity = ({item, index}) => {
    return (
      <View keyExtractor={index} style={[]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
          }}>
          <Text style={styles.taskDetailsTitle}>Assigneed Task : </Text>
          <Text style={[styles.taskDetailsTitle,{width:'80%'}]} numberOfLines={3}> {item?.assignee}</Text>
        </View>
        <Text
          style={[styles.taskDetailsDes, {marginBottom: hp(1)}]}
          numberOfLines={2}>
          {item?.description}
        </Text>
        {item?.updatedBy && item.updatedBy.length > 0 ? (
          item.updatedBy
            ?.slice()
            .reverse()
            .map((item, index) => (
              <View style={styles.taskStatusListStyle} key={index}>
                <View style={{marginLeft: wp(2)}}>
                  <View
                    style={[
                      styles.taskStatusInsideContainer,
                      {justifyContent: 'space-between', alignItems: 'center'},
                    ]}>
                    <View style={styles.taskStatusInsideContainer}>
                      <Text style={styles.StatusQue}>Task Status : </Text>
                      <Text style={[styles.StatusAns]}>{item?.status}</Text>
                    </View>
                    <View>
                      <VectorIcon
                        type={'MaterialIcons'}
                        name={'check-circle-outline'}
                        color={'green'}
                        size={23}
                        style={[
                          styles.vactorIcon,
                          {marginRight: wp(2), marginTop: wp(2)},
                        ]}
                      />
                    </View>
                  </View>
                  <View style={styles.taskStatusInsideContainer}>
                    <Text style={styles.StatusQue}>
                      Update Task User Name :{' '}
                    </Text>
                    <Text style={styles.StatusAns}>{item?.name}</Text>
                  </View>
                  <View style={styles.taskStatusInsideContainer}>
                    <Text style={styles.StatusQue}>
                      Update Task User Gmail :{' '}
                    </Text>
                    <Text
                      style={[
                        styles.StatusAns,
                        {width: '55%', paddingRight: wp(1)},
                      ]}
                      numberOfLines={4}>
                      {item?.email}
                    </Text>
                  </View>
                  <View style={styles.taskStatusInsideContainer}>
                    <Text style={styles.StatusQue}>Update Task Time : </Text>
                    <Text style={styles.StatusAns}>
                      {item?.updatedAt
                        ? moment(item.updatedAt).format(
                            'DD-MMMM-YYYY hh:mm:ss A',
                          )
                        : 'No Deadline Date Found'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
        ) : (
          <Text
            style={{
              fontSize: hp(2),
              color: Colors.BlackOpactiyTxt,
            }}>
            No Updated Tasks Status Found ! 🔍
          </Text>
        )}
      </View>
    );
  };
  return (
    <View style={[styles.contianer]}>
      <FlatList
        data={tabsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {isTabUnderlineBution == 0 ? (
        <ScrollView
          style={{
            borderRadius: wp(3),
            padding: wp(2),
            marginHorizontal: wp(1.5),
            marginTop: hp(-3),
            marginRight: wp(4),
          }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: Fonts.InterBold700,
              marginTop: hp(2),
              color: currentTheme.textColor,
            }}>
            {dataParams?.taskTittle
              ? dataParams?.taskTittle
              : 'Not Task Title Found'}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterBold700,
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
                fontFamily: Fonts.InterBold700,
              }}>
              Deadline :
            </Text>{' '}
            <Text style={{color: 'red', fontWeight: '600'}}></Text>
            {moment(dataParams?.dueDate).format('DD-MMMM-YYYY')
              ? moment(dataParams?.dueDate).format('DD-MMMM-YYYY')
              : 'No Dedline Date Found '}
          </Text>
          <Text style={{color: currentTheme.textColor, fontSize: hp(1.9)}}>
            {dataParams?.description
              ? dataParams?.description
              : 'No Description Found.'}{' '}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2.3),
              fontFamily: Fonts.InterBold700,
              marginTop: hp(2),
              marginBottom: hp(0.5),
            }}>
            Attachments
          </Text>

          {dataParams.fileAttachments &&
          dataParams.fileAttachments.length > 0 ? (
            dataParams.fileAttachments.map((fileUrl, index) => (
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
                            // width: item?.fileAttachment ? '30%' : '100%',
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
          <Text
            style={{
              padding: wp(4),
            }}
          />
        </ScrollView>
      ) : null}

      {isTabUnderlineBution == 1 ? (
        <View style={{borderWidth:1,borderColor:Colors.BlackOpactiy,borderRadius:wp(1),height:hp(35),width:'97%'}}>
 {/* ###############################  */}

  <KeyboardAvoidingView style={[styles.container,]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{flexDirection:'row'}}>

      <FlatList
        //  data={messages}
         data={recevedChat}
        showsVerticalScrollIndicator={false}
         renderItem={renderItemRecevedChat}
         keyExtractor={(item, index) => index.toString()}
         contentContainerStyle={styles.messageList}
        //  ref={messagesEndRef}
        //  inverted
       />
      <FlatList
         data={messages}
        showsVerticalScrollIndicator={false}
        //  data={recevedChat}
         renderItem={renderItemChat}
         keyExtractor={(item, index) => index.toString()}
         contentContainerStyle={styles.messageList}
         ref={messagesEndRef}
         inverted
       />
     
      </View>
  
     
       <View style={styles.inputContainer}>
         <TextInput
           value={message}
           style={styles.input}
           onChangeText={(txt)=>setMessage(txt)}
           placeholder="Type your message..."
         />
         <Button title="Send" onPress={sendMessage} />
       </View>
     </KeyboardAvoidingView>


 {/* ##############################  */}
        </View>
      ) : null}
      {isTabUnderlineBution == 2 ? (
        <ScrollView
        showsVerticalScrollIndicator={false}
          style={{
            borderRadius: wp(3),
            padding: wp(2),
            marginHorizontal: wp(1.5),
            marginTop: hp(-3),
            marginRight: wp(4),
          }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: Fonts.InterBold700,
              marginTop: hp(2),
              color: currentTheme.textColor,
            }}>
            {dataParams?.taskTittle
              ? dataParams?.taskTittle
              : 'Not Task Title Found'}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2),
              fontFamily: Fonts.InterBold700,
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
                fontFamily: Fonts.InterBold700,
              }}>
              Deadline :
            </Text>{' '}
            <Text style={{color: 'red', fontWeight: '600'}}></Text>
            {moment(dataParams?.dueDate).format('DD-MMMM-YYYY')
              ? moment(dataParams?.dueDate).format('DD-MMMM-YYYY')
              : 'No Dedline Date Found '}
          </Text>
          <Text style={{color: currentTheme.textColor, fontSize: hp(1.9)}}>
            {dataParams?.description
              ? dataParams?.description
              : 'No Description Found.'}{' '}
          </Text>
          <Text
            style={{
              color: currentTheme.textColor,
              fontSize: hp(2.3),
              fontFamily: Fonts.InterBold700,
              marginTop: hp(2),
              marginBottom: hp(0.5),
            }}>
            Attachments
          </Text>

          {dataParams.fileAttachments &&
          dataParams.fileAttachments.length > 0 ? (
            dataParams.fileAttachments.map((fileUrl, index) => (
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
                            // width: item?.fileAttachment ? '30%' : '100%',
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
          <Text
            style={{
              padding: wp(4),
            }}
          />
        </ScrollView>
      ) : null}

      {isTabUnderlineBution == 3 ? (
        <View style={{width: '98%'}}>
          <Text style={styles.taskDetailsStatus}>Task change Status</Text>
          <View style={{}}>
            <FlatList
              data={filteredData?.slice().reverse() || []}
              // taskStatusList?.updatedBy?.slice().reverse()
              renderItem={renderItemActivity}
              // keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={false}
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
                    No Updated Tasks Status Found ! 🔍
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      ) : null}

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
    </View>
  );
};

export default TaskManageChat;

const styles = StyleSheet.create({
  contianer: {
    width: '100%',
    paddingLeft: wp(3),
    marginTop: hp(3),
    paddingBottom: hp(10),
  },
  tabBtnContainer: {
    marginBottom: hp(5),
    paddingBottom: hp(1),
    width: wp(23.5),
    borderBottomWidth: wp(0.5),
    borderBottomColor: Colors.skyBlue,
    height: hp(4),
  },
  tabBtnContainerText: {
    textAlign: 'center',
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
    color: Colors.skyBlue,
  },
  taskDetailsStatus: {
    color: Colors.Black,
    fontSize: hp(2),
    fontFamily: Fonts.InterBold700,
    marginTop: hp(-2),
    marginBottom: hp(1),
  },
  taskDetailsTitle: {
    color: Colors.Black,
    fontSize: hp(2),
    fontFamily: Fonts.InterMedium500,
  },
  taskDetailsDes: {
    color: Colors.tabBtnContainerText,
    fontSize: hp(1.5),
  },
  taskStatusListStyle: {
    backgroundColor: Colors.skyBlue,
    marginBottom: hp(1),
    padding: wp(2),
    borderRadius: wp(2),
  },
  taskStatusInsideContainer: {flexDirection: 'row', alignItems: 'center'},
  StatusQue: {
    color: Colors.Black,
    fontSize: hp(1.5),
    fontFamily: Fonts.InterBold700,
  },
  StatusAns: {
    color: Colors.Black,
    fontSize: hp(1.5),
    fontFamily: Fonts.InterMedium500,
  },
  // ################################################ 
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messageList: {
    paddingBottom: 10,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    height: 40,
  },
});
