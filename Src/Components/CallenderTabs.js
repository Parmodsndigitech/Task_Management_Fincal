// import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {hp, wp} from '../Constants/Responsive';
// import Colors from '../Constants/Colors';
// import Fonts from '../Constants/Fonts';
// import VectorIcon from '../Constants/VectorIcon';
// import ScreensName from '../Navigations/ScreensName';
// import {useNavigation} from '@react-navigation/native';
// import moment from 'moment';

// const tabsData = [
//   {
//     id: 1,
//     date: '01',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 2,
//     date: '02',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 3,
//     date: '03',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 4,
//     date: '04',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 5,
//     date: '05',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 6,
//     date: '06',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 7,
//     date: '07',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 8,
//     date: '08',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 9,
//     date: '09',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 10,
//     date: '10',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 11,
//     date: '11',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 12,
//     date: '12',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 13,
//     date: '13',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 14,
//     date: '14',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 15,
//     date: '15',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 16,
//     date: '16',
//     name: 'NOV, TUE',
//   },

//   {
//     id: 17,
//     date: '17',
//     name: 'NOV, TUE',
//   },
//   {
//     id: 18,
//     date: '18',
//     name: 'NOV, TUE',
//   },
// ];
// const CallenderTabs = ({dataParams}) => {
//   // console.log('sumit.....',dataParams)
//   const navigation = useNavigation();
//   const [isTabUnderlineBution, setIsTabUnderlineButton] = useState([0]);



 
//   // const renderItem = ({item, index}) => {
//   //   return (
//   //     <View>
//   //       <TouchableOpacity
//   //         onPress={() => {
//   //           setIsTabUnderlineButton(index);
//   //         }}
//   //         activeOpacity={0.7}
//   //         style={[
//   //           styles.tabBtnContainer,
//   //           {
//   //             backgroundColor:
//   //               isTabUnderlineBution == index
//   //                 ? 'rgb(235,228,255)'
//   //                 : Colors.skyBlue,
//   //             borderColor:
//   //               isTabUnderlineBution == index ? Colors.Black : Colors.Primary,
//   //           },
//   //         ]}>
//   //         <Text style={styles.tabBtnContainerText}> {item?.date}</Text>
//   //         <Text
//   //           style={[
//   //             styles.tabBtnContainerText,
//   //             {
//   //               fontFamily: Fonts.InterMedium500,
//   //               fontSize: hp(1.7),
//   //               marginTop: hp(-0.3),
//   //             },
//   //           ]}>
//   //           {' '}
//   //           {item?.name}
//   //         </Text>
//   //       </TouchableOpacity>
//   //     </View>
//   //   );
//   // };
//   return (
//     <View style={styles.contianer}>
//       {/* <FlatList
//         data={dataParams}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       /> */}
//       {/* {isTabUnderlineBution == 0 ? ( */}

//       <Text style={{fontSize:hp(2.3),fontWeight:'600',color:'Black',padding:wp(2),marginTop:hp(1)}}>Today Task Details :  {moment(dataParams?.startDate).format('DD-MM-YYYY')}</Text>
//         <View
//           style={{
//             backgroundColor: 'rgb(235,228,255)',
//             borderRadius: wp(3),
//             padding: wp(2),
//             marginHorizontal: wp(1.5),
//             // marginTop: hp(-2),
//             marginRight: wp(4),
//           }}>
//           <Text
//             style={{
//               color: Colors.Black,
//               fontSize: hp(2.3),
//               fontFamily: Fonts.InterBold700,
//               marginTop: hp(2),
//             }}>
//             Lorem Lyupsem sampl
//           </Text>
//           <Text
//             style={{
//               color: 'red',
//               fontSize: hp(2),
//               fontFamily: Fonts.InterMedium500,
//             }}>
//             <Text
//               style={{
//                 color: Colors.Black,
//                 fontFamily: Fonts.InterBold700,
//               }}>
//               Deadline :
//             </Text>{' '}
//             2025-01-08
//           </Text>
//           <Text>
//             Task Management App is a digital tool designed to help users
//             organize, track, and complete tasks efficiently. It is used by
//             individuals, teams, and businesses to improve productivity, ensure
//             better task coordination, and manage time effectively. The app
//             allows users to create tasks, set deadlines, prioritize workloads,
//             collaborate with team members, and track progress all within a
//             single platform.
//           </Text>
//           <Text
//             style={{
//               color: Colors.Black,
//               fontSize: hp(2.3),
//               fontFamily: Fonts.InterBold700,
//               marginTop: hp(2),
//               marginBottom: hp(0.5),
//             }}>
//             Attachments
//           </Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginBottom: wp(2),
//             }}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => {
//                 alert('pdf');
//               }}>
//               <VectorIcon
//                 type={'MaterialCommunityIcons'}
//                 name={'file-pdf-box'}
//                 color={'red'}
//                 size={40}
//                 style={styles.vactorIcon}
//               />
//             </TouchableOpacity>
//             <View>
//               <Text
//                 style={{
//                   color: Colors.Black,
//                   fontSize: hp(2),
//                   fontFamily: Fonts.InterMedium500,
//                 }}>
//                 Photo-2022_04-20 19.30.49
//               </Text>
//               <Text
//                 style={{
//                   color: Colors.Black,
//                   fontSize: hp(1.8),
//                   fontFamily: Fonts.InterRegular400,
//                   marginTop: hp(-0.5),
//                 }}>
//                 JPG. 2.3 MB
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginBottom: wp(2),
//             }}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => {
//                 alert('pdf');
//               }}>
//               <VectorIcon
//                 type={'MaterialCommunityIcons'}
//                 name={'file-pdf-box'}
//                 color={'red'}
//                 size={40}
//                 style={styles.vactorIcon}
//               />
//             </TouchableOpacity>
//             <View>
//               <Text
//                 style={{
//                   color: Colors.Black,
//                   fontSize: hp(2),
//                   fontFamily: Fonts.InterMedium500,
//                 }}>
//                 Photo-2022_04-20 19.30.49
//               </Text>
//               <Text
//                 style={{
//                   color: Colors.Black,
//                   fontSize: hp(1.8),
//                   fontFamily: Fonts.InterRegular400,
//                   marginTop: hp(-0.5),
//                 }}>
//                 JPG. 2.3 MB
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginBottom: wp(2),
//             }}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => {
//                 alert('pdf');
//               }}>
//               <VectorIcon
//                 type={'MaterialCommunityIcons'}
//                 name={'file-pdf-box'}
//                 color={'red'}
//                 size={40}
//                 style={styles.vactorIcon}
//               />
//             </TouchableOpacity>
//             <View>
//               <Text
//                 style={{
//                   color: Colors.Black,
//                   fontSize: hp(2),
//                   fontFamily: Fonts.InterMedium500,
//                 }}>
//                 Photo-2022_04-20 19.30.49
//               </Text>
//               <Text
//                 style={{
//                   color: Colors.Black,
//                   fontSize: hp(1.8),
//                   fontFamily: Fonts.InterRegular400,
//                   marginTop: hp(-0.5),
//                 }}>
//                 JPG. 2.3 MB
//               </Text>
//             </View>
//           </View>
//           <Text
//             style={{
//               fontSize: hp(2),
//               textAlign: 'center',
//               fontFamily: Fonts.InterBold700,
//               color: '#8a62fe',
//               padding: wp(4),
//             }}
//             onPress={() =>
//               navigation.navigate(ScreensName.TASKMANAGERELATEDQUERY)
//             }>
//             View Detailed Task
//           </Text>
//         </View>
//       {/* ) : null} */}
//       {/* {isTabUnderlineBution == 1 ? <Text>1</Text> : null}
//       {isTabUnderlineBution == 2 ? <Text>2</Text> : null}
//       {isTabUnderlineBution == 3 ? <Text>3</Text> : null} */}
//     </View>
//   );
// };

// export default CallenderTabs;

// const styles = StyleSheet.create({
//   contianer: {
//     width: '100%',
//     paddingLeft: wp(3),
//     // marginTop: hp(3),
//   },
//   tabBtnContainer: {
//     marginRight: wp(5),
//     paddingVertical: hp(2.5),
//     paddingHorizontal: wp(2.5),
//     marginBottom: hp(5),
//     borderRadius: wp(3),
//     backgroundColor: Colors.skyBlue,
//   },
//   tabBtnContainerText: {
//     textAlign: 'center',
//     color: Colors.Black,
//     fontFamily: Fonts.InterBold700,
//     fontSize: hp(2),
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CallenderTabs = () => {
  return (
    <View>
      <Text>CallenderTabs</Text>
    </View>
  )
}

export default CallenderTabs

const styles = StyleSheet.create({})