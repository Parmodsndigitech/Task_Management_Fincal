import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AllTask from '../../Components/AllTask'
import AppWapper from '../../Components/AppWapper'
import Colors from '../../Constants/Colors'
import { hp, wp } from '../../Constants/Responsive'
import { ThemeContext } from '../../Theme/ThemeContext'
import { useTranslation } from 'react-i18next'

const About = () => {
    const {currentTheme} = useContext(ThemeContext);
    const {t} = useTranslation();
  return (
    <AppWapper containerProps={{backgroundColor:currentTheme.backgroundColor}}>
      <Text style={{color:currentTheme.textColor,fontSize:hp(2.5),marginLeft:wp(4),marginTop:hp(1),fontWeight:'600'}}>{t('AllTask')} </Text>
      <AllTask />
    </AppWapper>
  )
}

export default About

const styles = StyleSheet.create({})