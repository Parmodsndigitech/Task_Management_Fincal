// /**
//  * @format
//  */
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// AppRegistry.registerComponent(appName, () => App);
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {ThemeProvider} from './Src/Theme/ThemeContext';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
const Main = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
AppRegistry.registerComponent(appName, () => Main);
