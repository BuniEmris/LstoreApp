import React, {useMemo} from 'react';
import {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {
  compareDateByKeys,
  getMonthName,
  parseDate,
  setDateByKey,
} from '../../../helpers/utils';
const allMonth = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];
const Month = ({styles, date, setDate, setCalendarType}) => {
  const [currentDate, setCurrentDate] = useState(date);
  const parseDateMemo = useMemo(() => parseDate(date), [date]);

  return (
    <>
      <View style={styles.selectDates}>
        <TouchableOpacity
          onPress={() => {
            setCurrentDate(
              setDateByKey(currentDate, currentDate.getFullYear() - 1, 'year'),
            );
          }}>
          <Text style={{color: '#87C289', fontSize: 25}}> {'<'} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentDate(setCalendarType('year'));
          }}>
          <Text style={{...styles.calendarText, marginTop: 5}}>
            {getMonthName(currentDate, 'year')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentDate(
              setDateByKey(currentDate, currentDate.getFullYear() + 1, 'year'),
            );
          }}>
          <Text style={{color: '#87C289', fontSize: 25}}>{'>'} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarItemsContainer}>
        {allMonth.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setDate(setDateByKey(currentDate, index, 'month'));
              setCalendarType('date');
            }}
            key={index}
            style={{
              ...styles.monthYearItems,
              color:
                currentDate.getFullYear() === parseDateMemo.year &&
                parseDateMemo.month === index
                  ? 'white'
                  : 'black',
              backgroundColor:
                currentDate.getFullYear() === parseDateMemo.year &&
                parseDateMemo.month === index
                  ? 'blue'
                  : 'white',
              borderRadius: 9,
            }}>
            <Text
              style={{
                ...styles.calendarText,
                color:
                  currentDate.getFullYear() === parseDateMemo.year &&
                  parseDateMemo.month === index
                    ? 'white'
                    : 'black',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default React.memo(props => <Month {...props} />);
