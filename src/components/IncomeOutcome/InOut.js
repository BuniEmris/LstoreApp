import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Top from '../Iconsvg/TopIcon';
import Down from '../Iconsvg/DownIcon';
import {useDispatch, useSelector} from 'react-redux';
import {getStatistics} from '../../store/reducers/profitReducer';
import {numberWithSpaces} from '../../helpers/Container';
const InOut = ({minus = false}) => {
  const data = useSelector(state => state.statistic);
  const state = useSelector(state => state.add);
  const styles = style(state.size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatistics());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.statusText}>{minus ? 'Расход' : 'Прибыль'}</Text>
        <Text style={styles.statusNumber}>
          {minus
            ? numberWithSpaces(data.expense)
            : numberWithSpaces(data.profit)}
        </Text>
      </View>
      <View style={styles.iconContain}>
        {minus ? (
          <View style={styles.downIcon}>
            <Down />
          </View>
        ) : (
          <View style={styles.upIcon}>
            <Top />
          </View>
        )}
      </View>
    </View>
  );
};
export default InOut;
const style = size =>
  StyleSheet.create({
    container: {
      width: 165 * size,
      height: 60 * size,
      borderRadius: 10 * size,
      backgroundColor: '#2A3151',
      marginTop: 16 * size,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      width: 125 * size,
    },
    statusText: {
      fontSize: 10 * size,
      fontWeight: '500',
      marginLeft: 14 * size,
      marginBottom: 7 * size,
      color: 'rgba(255, 255, 255, 0.5)',
    },
    statusNumber: {
      fontSize: 12 * size,
      fontWeight: '600',
      marginLeft: 14 * size,
      color: 'white',
    },
    downIcon: {
      backgroundColor: '#E6974F',
      borderRadius: 50 * size,
      width: 30 * size,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30 * size,
    },
    upIcon: {
      backgroundColor: '#4EC770',
      borderRadius: 50 * size,
      width: 30 * size,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30 * size,
    },
    iconContain: {
      width: 30 * size,
    },
  });
