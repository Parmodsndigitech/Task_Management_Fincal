import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from '../Redux/Slice/LoginSlice';
import {Text} from 'react-native';
import {InitialScreen} from '../Screens/Index';

const Stack = createNativeStackNavigator();
export default function Routes() {
  const dispatch = useDispatch();
  const isLogIn = useSelector(state => state.isLogin?.isLogin);
  // console.log('isLogIn pamrod...',isLogIn)
  const [loarding, setloarding] = React.useState(true);
  const GetToken = async () => {
    const token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err, '----- token err'),
    );
    console.log('token@', token);
    if (token) {
      dispatch(setLogin(true));
    }
  };
  React.useEffect(() => {
    GetToken();
    setTimeout(() => {
      setloarding(false);
    }, 6000);
  }, []);

//   const userData = useSelector(state => state?.userData);
//   console.log('userData...', userData);
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      {loarding ? (
        <>
          <InitialScreen />
        </>
      ) : (
        <Stack.Navigator>
          {/* {
            userData?.isLogin?<>{MainStack}</>
            :
            <>{AuthStack(Stack,isFirstTime)}</>
        } */}

          {/* {!!userData?.isLogin?MainStack(Stack):AuthStack(Stack)} */}
          {isLogIn ? MainStack(Stack) : AuthStack(Stack)}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
