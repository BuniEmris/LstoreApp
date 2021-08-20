import React from 'react';
import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getYears, setDateByKey} from '../../../helpers/utils';
const Year = ({styles, setCalendarType, value, setDate}) => {
  const date = new Date();
  const [yearsData, setyearsData] = useState(getYears(date.getFullYear()));
  return (
    <View style={styles.calendarItemsContainer}>
      {yearsData.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            setDate(setDateByKey(date, item, 'year'));
            setCalendarType('month');
          }}
          key={index}
          style={[
            styles.monthYearItems,
            {
              backgroundColor: value.getFullYear() === item ? 'blue' : 'white',
              borderRadius: 9,
            },
          ]}>
          <Text
            style={{
              ...styles.calendarText,
              color: value.getFullYear() === item ? 'white' : 'black',
            }}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setyearsData(getYears(yearsData[0] - 1))}>
        <Text style={{color: '#87C289', fontSize: 20}}> {'<'} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={yearsData[15] + 16 > date.getFullYear()}
        onPress={() => setyearsData(getYears(yearsData[15] + 16))}>
        <Text style={{color: '#87C289', fontSize: 20}}>{'>'} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Year;
