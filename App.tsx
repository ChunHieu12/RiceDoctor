/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import store from './src/redux/store';
import { Provider } from "react-redux";
import AppRouters from './src/navigators/AppRouters';
const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  // const [accessToken, setAccessToken] = useState('');


  // const { getItem, setItem } = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  // useEffect(() => {
  //   checkLogin();

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  // const checkLogin = async () => {

  //   const token = await getItem()
  //   token && setAccessToken(token);
  // }


  return (
    <>
      <Provider store={store}>
      <StatusBar
      barStyle='dark-content'
      backgroundColor="transparent"
      translucent
      />


      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
        <AppRouters/>
        </NavigationContainer>
      )}
      </Provider>

    </>
  )
}

export default App