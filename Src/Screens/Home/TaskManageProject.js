// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, { useEffect, useState } from 'react';
// import StatusBarCom from '../../Components/StatusBarCom';
// import Colors from '../../Constants/Colors';
// import {hp, wp} from '../../Constants/Responsive';
// import Fonts from '../../Constants/Fonts';
// import AppWapper from '../../Components/AppWapper';
// import VectorIcon from '../../Constants/VectorIcon';
// import ImagePath from '../../Constants/ImagePath';
// import FastImage from 'react-native-fast-image';
// import CallenderTabs from '../../Components/CallenderTabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ApiUrl } from '../../Utils/apiurl';
// import { ToastCom } from '../../Components/ToastCom';

// const TaskManageProject = ({route}) => {
// // const { dataParams } = route.params;
// const [userProfileData, setUserProfileData] = useState('');
// const [loading, setLoading] = useState(false);

//     useEffect(()=>{
//       _getUserProfileDetails()
//     },[])
//       const _getUserProfileDetails = async () => {
//       setLoading(true);
//       let token = await AsyncStorage.getItem('token').catch(err =>
//         console.log(err),
//       );
//       try {
//         const response = await fetch(ApiUrl.getUserProfileDetailsApi, {
//           method: 'Get',
//           // body: fd,
//           headers: {
//             Accept: 'multipart/form-data',
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//             token: token,
//           },
//         });
//         const result = await response.json();
//         setUserProfileData(result?.data);
//         ToastCom({type: 'success', text2: result?.message});
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//         ToastCom({type: 'error', text2: result?.message});
//       }
//     };
//   return (
//     <AppWapper containerProps={{backgroundColor: Colors.White}}>
//       <StatusBarCom backgroundColor={Colors.Black} barStyle={'light-content'} />
//       {/* Header Start */}
//       <View style={styles.headerContianer}>
//         <View style={styles.headerInnerContianer}>
//           <VectorIcon
//             type={'FontAwesome'}
//             name={'user-circle-o'}
//             color={Colors.White}
//             size={40}
//             style={styles.vactorIcon}
//           />
//           <View style={{marginLeft: wp(1.5)}}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Text style={[styles.hiiTxt, {fontSize: hp(2.2)}]}>Hii, </Text>{' '}
//               <FastImage
//                 source={ImagePath.HiiGif}
//                 style={styles.hiiGit}
//                 resizeMode="cover"
//               />
//             </View>
//             <Text style={[styles.hiiTxt, {marginTop: hp(-0.8)}]}>
//               Tony Stark{' '}
//             </Text>
//           </View>
//         </View>
//         <TouchableOpacity activeOpacity={0.8} onPress={() => alert('Alert')}>
//           <VectorIcon
//             type={'MaterialCommunityIcons'}
//             name={'bell-badge-outline'}
//             size={30}
//             color={Colors.White}
//             style={{alignItems: 'flex-end'}}
//           />
//         </TouchableOpacity>
//       </View>
//       {/* Header End */}
//          {/* <View style={styles.container}> */}
//           <CallenderTabs dataParams={dataParams}/>
//          {/* </View> */}
//     </AppWapper>
//   );
// };

// export default TaskManageProject;

// const styles = StyleSheet.create({
//   headerContianer: {
//     backgroundColor: Colors.Black,
//     width: '100%',
//     height: hp(8),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: wp(3),
//   },
//   headerInnerContianer: {flexDirection: 'row', alignItems: 'center'},
//   hiiTxt: {
//     color: Colors.White,
//     fontFamily: Fonts.InterBold700,
//     fontSize: hp(2),
//   },
//   hiiGit: {width: wp(9), height: wp(7), marginLeft: wp(-2), marginTop: hp(-1)},
//   container: {
//     // backgroundColor:Colors.Black,
//     // flex:1,
//     padding: wp(4),
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskManageProject = () => {
  return (
    <View>
      <Text>TaskManageProject</Text>
    </View>
  )
}

export default TaskManageProject

const styles = StyleSheet.create({})