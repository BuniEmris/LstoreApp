import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTypeAC} from '../../store/reducers/profitReducer';
const ProfitCalendar = ({setUpdating, onRefresh}) => {
  const type = useSelector(state => state.statistic.type);
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  const dispatch = useDispatch();
  const types = [
    {value: 'Day', name: 'День'},
    {value: 'Week', name: 'Неделя'},
    {value: 'Month', name: 'Месяц'},
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.profitText}>Прибыль</Text>
      <View style={styles.cardBox}>
        {types.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              dispatch(setTypeAC(item.value));
              setUpdating(prev => !prev);
              // onRefresh();
            }}>
            <Text
              style={{
                ...styles.calendarText,
                fontWeight: type === item.value ? 'bold' : '600',
                color:
                  type === item.value ? '#5264F0' : 'rgba(37, 52, 102, 0.5)',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default ProfitCalendar;
const style = size =>
  StyleSheet.create({
    container: {
      width: 375 * size,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    calendarText: {
      marginRight: 22 * size,
      fontSize: 12 * size,
    },
    profitText: {
      color: 'rgb(37, 52, 102)',
      lineHeight: 25 * size,
      fontSize: 20 * size,
      marginLeft: 16 * size,
      fontWeight: 'bold',
      marginTop: 25 * size,
    },
    cardBox: {
      // marginLeft: 152 * size,
      flexDirection: 'row',
      marginTop: 31 * size,
    },
  });
