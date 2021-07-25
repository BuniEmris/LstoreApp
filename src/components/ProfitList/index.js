import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Buy from '../Iconsvg/Buy';

import {useDispatch, useSelector} from 'react-redux';
import {getSalesData} from '../../store/reducers/profitReducer';
import {numberWithSpaces} from '../../helpers/Container';
const ProfitList = () => {
  const salesdata = useSelector(state => state.statistic);
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalesData());
  }, []);

  return (
    <View style={styles.mainContainer}>
      {salesdata.salesdata.map((item, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.buyIcon}>
            <Buy />
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.listText}>{item.Name}</Text>
            <Text>{numberWithSpaces(item.Sum)} UZS</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProfitList;
const style = size =>
  StyleSheet.create({
    mainContainer: {
      width: 308 * size,
      marginLeft: 30 * size,
    },
    container: {
      flexDirection: 'row',
      marginTop: 26 * size,
      marginBottom: 9 * size,
    },
    buyIcon: {
      backgroundColor: 'white',
      height: 51 * size,
      width: 51 * size,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10 * size,
    },
    listText: {
      fontFamily: 'Gilroy-ExtraBold',
      fontWeight: '800',
      fontSize: 16 * size,
      width: 120 * size,
      marginLeft: 12.5 * size,
    },
  });
