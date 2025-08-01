import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'
import { hp, wp } from '../Constants/Responsive'
import Fonts from '../Constants/Fonts'


const ButtonCom = ({label,onPress,propsContainer,propsLabel,disabled}) => {
  return (
    <TouchableOpacity activeOpacity={.8} style={{...styles.container,...propsContainer}} 
    onPress={onPress}
    disabled={disabled}
    >
      <Text style={{...styles.label,...propsLabel}}>{label}</Text>
    </TouchableOpacity>
  )
}

export default ButtonCom

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.Primary,
        paddingHorizontal:wp(2),
        paddingVertical:hp(1.5),
        borderRadius:wp(2),
        width:'80%',marginVertical:hp(.7),
        borderWidth:wp(.3),
        borderColor:Colors.Black
    },
    label:{
        textAlign:'center',
        color:Colors.Black,
        fontFamily:Fonts.InterBold700,
        textTransform:'capitalize',
        fontSize:hp(1.9),
        letterSpacing:wp(.2)
    }
})