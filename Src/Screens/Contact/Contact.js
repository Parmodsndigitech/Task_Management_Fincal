import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import { hp } from '../../Constants/Responsive'

const Contact = () => {
  return (
    <View style={{flex:1,backgroundColor:Colors.Black}}>
      <Text style={{color:Colors.White,fontSize:hp(2.5)}}>No data found ..</Text>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({})