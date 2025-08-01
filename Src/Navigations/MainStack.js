import React from 'react';
import ScreensName from './ScreensName';
import * as Screen from '../Screens/Index';
import BottomNavigation from './BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';

// var
const animation = 'slide_from_right';
const headerShown = false;
export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={ScreensName.BOTTOMNAVIGATION}
        component={BottomNavigation}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={ScreensName.PRIVACYPOLICY}
        component={Screen.PrivacyPolicy}
        // options={{headerShown: false}}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.HELPCENTER}
        component={Screen.HelpCenter}
        // options={{headerShown: false}}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.TASKMANAGEPROJECT}
        component={Screen.TaskManageProject}
        // options={{headerShown: false}}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.TASKMANAGERELATEDQUERY}
        component={Screen.TaskManageRelatedQuery}
        // options={{headerShown: false}}
        options={{animation: animation, headerShown: headerShown}}
      />
 </>
  );
}
