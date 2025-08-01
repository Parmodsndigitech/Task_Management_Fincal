import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASEURL_Local = "http://16.171.8.84:8085/api/";
const BASEURL = 'https://taskapi.nirmaltaskmanager.com/api/';

export const ApiUrl = {
  LoginMobileEmailApi: `${BASEURL}login/user`,
  getUserProfileDetailsApi: `${BASEURL}get/by/id/user`,
  getUserAllTaskApi: `${BASEURL}get/all/task/admin`,
  UpdateTaskStatusApi: `${BASEURL}update/status/task`,
  ChatGetsApi: `${BASEURL}get/message/`,
};

export const APIRequest = async (
  config = {},
  onSuccess,
  onError,
  noAuth = null,
) => {
  const token = await AsyncStorage.getItem('token').catch(err =>
    console.log(err),
  );
  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // token: token
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }
    axios(data)
      .then(res => {
        if (!res.data.error) {
          onSuccess(res?.data);
        } else {
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        console.log(err);
        onError(err?.response?.data ? err?.response?.data : err?.response);
      });
  } catch (error) {
    console.log('error', error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  // const token = new User().getToken();
  const token = await AsyncStorage.getItem('token').catch(err =>
    console.log(err),
  );

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
    }

    axios(data)
      .then(res => {
        // if (res.status == 200 || res.status == 201) {
        //   console.log(res.data);
        //   onSuccess(res.data);
        // }
        // console.log("asdas",res);

        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};
