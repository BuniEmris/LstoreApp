import React, {useEffect} from 'react';
import Login from '../screens/Login';
import MainTabNavigation from './MainTabNavigation';
import {useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

const MainStackNavigation = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) return <Login setIsLogin={setIsLogin} />;
  return <MainTabNavigation />;
};
export default MainStackNavigation;
