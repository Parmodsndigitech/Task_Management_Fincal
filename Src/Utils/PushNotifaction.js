import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from '@react-native-firebase/app';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

// const getToken = async () => {
//   const app = getApp();
//   const token = await messaging(app).getToken();
//   console.log('Get FCM Token', token);
// };

const getFcmToken = async () => {
  const app = getApp();
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old Fcm Token', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging(app).getToken();
      if (fcmToken) {
        console.log('New Fcm Token..', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Erorr fcm Token Screen PushNotifaction..', error);
    }
  }
};

export const NotifactionService=async()=>{
  // Forground Notifaction  
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
}
