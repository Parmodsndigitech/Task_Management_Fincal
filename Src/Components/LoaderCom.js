import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';

const LoaderCom = ({propsContianer}) => {
  return (
    <View style={{...styles.contianer, ...propsContianer}}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default LoaderCom;