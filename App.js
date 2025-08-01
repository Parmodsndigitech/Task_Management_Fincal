import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {Alert, LogBox, Platform, StyleSheet, Text, View} from 'react-native';
import {store} from './Src/Redux/store';
import Routes from './Src/Navigations/Routes';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {hp} from './Src/Constants/Responsive';
import FastImage from 'react-native-fast-image';
import ImagePath from './Src/Constants/ImagePath';
import Colors from './Src/Constants/Colors';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
import {requestUserPermission} from './Src/Utils/PushNotifaction';
// const {dispatch} = store;
const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState(null);

  // Push Nofiaction Start
  useEffect(() => {
    // requestPermissionAndroid()
    requestUserPermission();
  }, []);
  // add code before START

  useEffect(() => {
    requestNotificationPermission();
  }, []);
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("Notification permission granted");
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn('Permission request failed', err);
      }
    } else {
      console.log(
        'No need to request notification permission for this version',
      );
    }
  };
  const requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getToken();
      console.log('Permission Granted');
    } else {
      console.log('Permission Denied');
    }
  };
  // const getToken=async()=>{
  //   const token = await messaging().getToken();
  //   console.log('Get Fcm Token', token)
  // }
  // const getToken = async () => {
  //   const app = getApp();
  //   const token = await messaging(app).getToken();
  //   console.log('Get FCM Token', token);
  // };
  // // Forground Notifaction
  //   useEffect(() => {
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     });
  //     return unsubscribe;
  //   }, []);

  // Push Nofiaction End

  useEffect(() => {
    // setTimeout(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });
    return () => {
      unsubscribe();
    };
    // }, 9000);
  }, []);
  LogBox.ignoreLogs(['warning']);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      {isConnected &&
      (connectionType === 'wifi' || connectionType === 'cellular') ? (
        <View style={{flex: 1}}>
          <Routes />
          <Toast />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.White,
          }}>
          <View style={{width: '30%', height: hp(20)}}>
            <FastImage
              source={ImagePath.errorInternNetGif}
              style={styles.EnventImg01}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              textAlign: 'center',
              fontSize: hp(2.2),
              color: Colors.Black,
            }}>
            No Internet connection.
          </Text>
        </View>
      )}
    </Provider>
  );
};
export default App;
const styles = StyleSheet.create({
  EnventImg01: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
});

// import React, { useState, useEffect, useRef } from 'react';
// import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const socket = io('https://task.eltutor.in'); // Backend URL

// const App = ({ userId, taskId }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   // console.log('messagesmessagesmessagesmessages.....',messages)
//   console.log('messagemessagemessagemessage.....',message)

//   // Auto-scroll जब संदेश बदलें
//   useEffect(() => {
//     messagesEndRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`https://task.eltutor.in/api/get/message/67d28f6bc9bd0551db2e5246`);
//         if (response?.data?.success) {
//           // console.log('backendMessages:', response?.data?.messages);
//           setMessages(response?.data?.messages);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching messages:', error);
//       }
//     };
//   useEffect(()=>{
//     fetchMessages()
//   },['67d28f6bc9bd0551db2e5246'])

//   useEffect(() => {
//     socket.emit('join_task', { userId: '67bd8b5401e57173d11af941', taskId: '67d28f6bc9bd0551db2e5246' });
//     // Listen for incoming messages
//     socket.on('receive_task_message', (msg) => {
//       console.log('📩 New Message Received:', msg);
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('receive_task_message');
//     };
//   }, [userId, taskId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const taskId = '67d28f6bc9bd0551db2e5246';
//       const senderId = '67bd8b5401e57173d11af941';
//       const message = 'I will provide you one Task';
//       socket.emit('send_task_message', {
//         taskId: taskId,
//         senderId: senderId,
//         message: message,
//       });
//       setMessage('');
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.messageContainer}>
//       <Text style={styles.messageText}>{item.message}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.messageList}
//         ref={messagesEndRef}
//         inverted
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           value={message}
//           style={styles.input}
//           onChangeText={(txt)=>setMessage(txt)}
//           placeholder="Type your message..."
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   messageList: {
//     paddingBottom: 10,
//   },
//   messageContainer: {
//     padding: 10,
//     marginBottom: 5,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginRight: 10,
//     height: 40,
//   },
// });

// export default App;
