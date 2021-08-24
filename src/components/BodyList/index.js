import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {numberWithSpaces} from '../../helpers/Container';
import {useDispatch, useSelector} from 'react-redux';
import {
  getGoods,
  getListHistory,
  getListHistoryAll,
} from '../../store/reducers/warehouseListReducer';
import {compareDate} from '../../helpers/utils';
import Buy from '../Iconsvg/Buy';
import moment from 'moment';

const BodyList = ({refRBSheet, alladdress}) => {
  const historyList = useSelector(state => state.warehouseL);
  const dispatch = useDispatch();
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  const historyListAll = useSelector(state => state.warehouseL);
  const loader = useSelector(state => state.warehouseL.loader2);
  const {first, last} = useSelector(state => state.add);
  useEffect(() => {
    dispatch(getListHistoryAll());
  }, []);

  useEffect(() => {
    if (historyList.warehouseID) {
      dispatch(getListHistory(historyList.warehouseID));
    } else {
      dispatch(getListHistoryAll());
    }
  }, [first, last, historyList.warehouseID]);

  useEffect(() => {
    historyList.warehouseID &&
      dispatch(getListHistory(historyList.warehouseID));
  }, [historyList.warehouseID]);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.bodyText}>
        {compareDate(first, last)
          ? moment(first).format('L')
          : moment(first).format('L') + moment(last.format('L'))}
        Cегодня
      </Text> */}
      <ScrollView>
        {alladdress ? (
          historyListAll?.historyAll?.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                ...styles.HistoryAllstyle,
                borderBottomWidth:
                  i !== historyListAll?.historyAll?.length - 1 ? 1.2 : 0,
                borderBottomColor: '#F5F5F5',
              }}>
              <View style={styles.buyIcon}>
                <Buy />
              </View>
              <View style={styles.boxContainer}>
                <View style={styles.textContainer}>
                  <Text
                    style={{
                      fontFamily: 'gilroy-bold',
                      fontWeight: '600',
                      fontSize: 16,
                      marginBottom: 4,
                    }}>
                    {item.Name}
                  </Text>
                </View>
                <View style={styles.textContainer2}>
                  <Text
                    style={{
                      textAlign: 'right',
                      marginBottom: 4,
                      fontWeight: '600',
                      fontFamily: 'gilroy-bold',
                    }}>
                    {numberWithSpaces(Math.floor(item.Sum))} uzs
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : loader ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 240,
            }}>
            <ActivityIndicator size="large" color={'#5264F0'} />
          </View>
        ) : historyList.history.length > 0 ? (
          historyList.history.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                dispatch(getGoods(item.UIDCategory));
                refRBSheet.current.open();
              }}
              style={styles.historyButton}>
              <View style={styles.buyIcon}>
                <Buy />
              </View>
              <View style={styles.boxContainer}>
                <View style={styles.textContainer}>
                  <Text
                    style={{
                      fontFamily: 'gilroy-bold',
                      fontWeight: '600',
                      fontSize: 16,
                      marginBottom: 4,
                    }}>
                    {item.Name}
                  </Text>
                </View>
                <View style={styles.textContainer2}>
                  <Text
                    style={{
                      textAlign: 'right',
                      marginBottom: 4,
                      fontWeight: '600',
                      fontFamily: 'gilroy-bold',
                    }}>
                    {numberWithSpaces(Math.floor(item.Sum))} uzs
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <Text>нет история </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BodyList;

const style = size =>
  StyleSheet.create({
    container: {
      width: 343 * size,
      maxHeight: 280 * size,
      marginBottom: 20 * size,
      overflow: 'hidden',
      backgroundColor: '#F8F9FC',
      borderRadius: 15 * size,
      shadowColor: 'rgba(42, 49, 81, 0.4)',
      shadowOffset: {
        width: 0,
        height: -1,
      },
      shadowOpacity: 1,
      shadowRadius: 30 * size,

      elevation: 24,
    },
    HistoryAllstyle: {
      height: 76 * size,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      // borderBottomWidth: item.Name === 1 ? 0 : 2,
      // borderBottomColor: '#F5F5F5',
    },
    boxContainer: {
      width: 250 * size,
      flexDirection: 'row',
    },
    buyIcon: {
      backgroundColor: '#F6F7F9',
      height: 51 * size,
      width: 51 * size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10 * size,
      marginRight: 12 * size,
      marginLeft: 16 * size,
    },
    textContainer: {
      width: 150 * size,
      justifyContent: 'center',
    },
    textContainer2: {
      width: 100 * size,
      marginTop: 4,
    },
    historyButton: {
      marginBottom: 5,
      height: 76,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      // borderBottomWidth: item.Name === 1 ? 0 : 2,
      // borderBottomColor: '#F5F5F5',
    },
  });
