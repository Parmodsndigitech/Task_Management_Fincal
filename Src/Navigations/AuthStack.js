import React from 'react';
import ScreensName from './ScreensName';
import * as Screen from '../Screens/Index';

// var
const animation = 'slide_from_right';
const headerShown = false;
export default function (Stack) {
  return (
    <>
     <Stack.Screen
        name={ScreensName.INITIALSCREEN}
        component={Screen.InitialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGONE}
        component={Screen.OnBoardingOne}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGTWO}
        component={Screen.OnBoardingTwo}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGTHREE}
        component={Screen.OnBoardingThree}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.LOGIN}
        component={Screen.Login}
        options={{animation: animation, headerShown: headerShown}}
      />
    </>
  );
}
