import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {numberWithSpaces} from '../../helpers/Container';
import {getTotal} from '../../store/reducers/addReducer';
const Card = () => {
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotal());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{numberWithSpaces(data.total)} </Text>
        <Text style={{...styles.text, fontSize: 20, marginTop: 1}}>UZS</Text>
        {/* <View style={{flexDirection: 'row', marginLeft: 90}}>
          <NotificationIcon />
          <View style={styles.profileImage}></View>
        </View> */}
      </View>
      <Text style={styles.balance}>Total Balance</Text>
    </View>
  );
};
export default Card;

const style = size =>
  StyleSheet.create({
    container: {
      width: 375 * size,
      height: 213 * size,
      backgroundColor: '#2A3151',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    textContainer: {
      flexDirection: 'row',
      width: 200 * size,
      height: 37 * size,
      marginLeft: 16 * size,
      marginTop: 58 * size,
      fontFamily: 'Gilroy-Medium',
    },
    text: {
      fontFamily: 'Gilroy-Medium',
      fontWeight: '600',
      lineHeight: 37,
      fontSize: 30,
      color: 'white',
    },
    profileImage: {
      width: 41 * size,
      height: 41 * size,
      borderRadius: 10 * size,
      borderWidth: 2 * size,
      marginLeft: 15 * size,
      borderColor: 'white',
    },
    balance: {
      marginTop: 6 * size,
      width: 95 * size,
      height: 18 * size,
      marginLeft: 17 * size,
      fontSize: 15 * size,
      lineHeight: 18 * size,
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.5)',
    },
  });
