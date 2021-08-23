import React, {useEffect, useState} from 'react';
import {decode as atob, encode as btoa} from 'base-64';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoginInput from '../../components/LoginInput';
import {getResource} from '../../srvCon';
import {setLoginAC} from '../../store/reducers/addReducer';
const Login = ({setIsLogin}) => {
  const [shoykeyb, setShowkeyb] = useState(false);
  const [locationAddress, setLocationAddress] = useState('test');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const login = `Basic ${btoa(`[${locationAddress}] ${username}:${password}`)}`;
  const dispatch = useDispatch();
  const state = useSelector(state => state.add);
  const styles = style(state.size, shoykeyb);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      setShowkeyb(true);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setShowkeyb(false);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Авторизация</Text>
            </View>
            <View>
              <LoginInput
                value={locationAddress}
                onChangeText={val => setLocationAddress(val)}
                iconname="map-pin"
                name="Адрес"
                placeholder="Ташкент"
              />
              <LoginInput
                value={username}
                onChangeText={val => setUsername(val)}
                iconname="user"
                name="Логин"
                placeholder="BUNI"
              />
              <LoginInput
                value={password}
                onChangeText={val => setPassword(val)}
                iconname="lock"
                name="Пароль"
                secureTextEntry={true}
              />
            </View>
            {shoykeyb ? <View /> : <View style={styles.keyboardSize} />}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                if (locationAddress && username) {
                  setLoader(true);
                  getResource('auth', login).then(response => {
                    if (response.auth) {
                      dispatch(setLoginAC(login));
                      setIsLogin(true);
                      setLoader(false);
                      //navigation.navigate('Tab');
                    } else {
                      Alert.alert('неправильный адрес или логин ');
                      setLoader(false);
                    }
                  });
                } else {
                  alert('пожалуйста,пишите пароль или адрес ');
                }
              }}>
              <Text style={styles.buttonText}>
                {loader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  'Войти'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
const style = (size, shoykeyb) =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: '#E5E5E5',
    },
    inner: {
      padding: 24 * size,
      flex: 1,
    },
    headerContainer: {
      marginTop: shoykeyb ? 5 * size : 35 * size,
      marginBottom: shoykeyb ? 5 * size : 30 * size,
    },
    headerText: {
      fontSize: 25 * size,
      fontWeight: 'bold',
      fontFamily: 'gilroy-bold',
    },
    buttonText: {
      color: 'white',
      fontSize: 18 * size,
      fontWeight: '700',
      fontFamily: 'gilroy-bold',
    },
    buttonContainer: {
      marginTop: 10 * size,
      alignItems: 'center',
      justifyContent: 'center',
      width: 335 * size,
      height: 60 * size,
      borderRadius: 10 * size,
      backgroundColor: '#5264F0',
    },
    keyboardSize: {
      height: 160 * size,
    },
  });
