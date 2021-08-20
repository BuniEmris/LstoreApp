import React, {useMemo, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {
  compareDateByKeys,
  getDateMonth,
  getMonthName,
  parseDate,
  setDateByKey,
} from '../../../helpers/utils';
const Days = ({styles, date, setDate, setCalendarType}) => {
  const [prevMonth, setPrevMonth] = useState(getDateMonth(date, 'prev'));
  const [currentMonth, setCurrentMonth] = useState(
    getDateMonth(date, 'current'),
  );
  const [nextMonth, setNextMonth] = useState(getDateMonth(date, 'next'));
  const setMonth = date => {
    setPrevMonth(getDateMonth(date, 'prev'));
    setCurrentMonth(getDateMonth(date, 'current'));
    setNextMonth(getDateMonth(date, 'next'));
  };
  const weekdays = [' ВС ', ' ПН ', ' ВТ ', ' СР ', ' ЧТ ', ' ПТ ', ' СБ '];
  const [changeColor, setChangeColor] = useState(false);

  const parseDateMemo = useMemo(() => parseDate(date), [date]);
  const isEqual = useMemo(
    () => compareDateByKeys(date, currentMonth?.date, 'year month'),
    [date, currentMonth?.date],
  );
  return (
    <>
      <View style={styles.selectDates}>
        <TouchableOpacity
          onPress={() => {
            setMonth(prevMonth.date);
          }}>
          <Text style={{color: '#87C289', fontSize: 20}}> {'<'} </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentMonth(setCalendarType('month'));
          }}>
          <Text style={styles.calendarText}>
            {getMonthName(currentMonth?.date, 'month year')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setMonth(nextMonth.date);
          }}>
          <Text style={{color: '#87C289', fontSize: 20}}>{'>'} </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: 300}}>
          {weekdays.map((item, index) => (
            <TouchableOpacity style={{width: 40}} key={index}>
              <Text
                style={{
                  ...styles.calendarText,

                  fontSize: 14,
                  color: 'rgba(37, 52, 102, 0.5)',
                  textAlign: 'center',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 300,
            marginTop: 22,
          }}>
          {prevMonth.list.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setMonth(prevMonth.date);
              }}>
              <Text
                style={{
                  ...styles.calendarText,
                  fontSize: 14,
                  color: 'rgba(37, 52, 102, 0.5)',
                  width: 40,
                  textAlign: 'center',
                  marginBottom: 30,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          {currentMonth?.list.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setDate(setDateByKey(currentMonth?.date, item, 'day'));
              }}
              key={index}>
              <Text
                style={{
                  ...styles.calendarText,
                  fontSize: 14,
                  backgroundColor:
                    isEqual && parseDateMemo.day === item ? 'blue' : 'white',
                  color:
                    isEqual && parseDateMemo.day === item ? 'white' : 'black',
                  marginBottom: 30,
                  width: 40,
                  borderRadius: 9,
                  textAlign: 'center',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          {nextMonth.list.map((item, index) => (
            <TouchableOpacity
              onPress={() => setMonth(nextMonth.date)}
              key={index}>
              <Text
                style={{
                  ...styles.calendarText,
                  fontSize: 14,
                  color: 'rgba(37, 52, 102, 0.5)',
                  width: 40,
                  marginBottom: 30,
                  textAlign: 'center',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default Days;
