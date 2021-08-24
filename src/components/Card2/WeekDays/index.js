import React, {useRef} from 'react';
import {ScrollView, View, TouchableOpacity, Text} from 'react-native';
import {compareDate} from '../../../helpers/utils';
import {
  setFirsDatetAC,
  setLastDateAC,
} from '../../../store/reducers/addReducer';
const WeekDays = ({dispatch, styles, setDateAC, calendar, getToday}) => {
  const ref = useRef();
  return (
    <View style={styles.weeklydate}>
      <ScrollView
        ref={ref}
        onContentSizeChange={() =>
          ref && ref.current.scrollToEnd({animated: false})
        }
        horizontal>
        {calendar.listDate.map((item, index) => {
          return (
            <TouchableOpacity
              key={index + '/' + calendar.date.getDate}
              onPress={() => {
                dispatch(setDateAC(item));
                dispatch(setFirsDatetAC(item));
                dispatch(setLastDateAC(item));
              }}
              style={{
                ...styles.daysButton,
                backgroundColor: compareDate(item, calendar.date)
                  ? '#5264F0'
                  : '#41486A',
              }}>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  fontFamily: 'gilroy-medium',
                }}>
                {getToday(item.getDay())}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'gilroy-medium',
                }}>
                {item.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeekDays;
