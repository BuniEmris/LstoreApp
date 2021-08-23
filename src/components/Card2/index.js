import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {compareDate, createListDate, getToday} from '../../helpers/utils';
import {setDateAC, setListDateAC} from '../../store/reducers/addReducer';

import WeekDays from './WeekDays/index';
import Calendar from './CalendarComponents/Calendar';
import HeaderText from './HeaderText';
const Card2 = ({warehouse1 = false, value}) => {
  const calendar = useSelector(state => state.add);
  const dispatch = useDispatch();

  const [date, setDate] = useState(value || new Date());

  const [isModalVisible, setModalVisible] = useState(false);

  const [calendarType, setCalendarType] = useState('date');

  const data = useSelector(state => state.add);
  const styles = style(data.size);

  useEffect(() => {
    if (compareDate(new Date(), calendar.date, 'greater')) {
      dispatch(setListDateAC(createListDate(calendar.date, true)));
    }
  }, [calendar.date]);

  return (
    <View style={styles.container}>
      {/* HEADER TEXT  */}
      <HeaderText
        setModalVisible={setModalVisible}
        warehouse1={warehouse1}
        calendar={calendar}
        styles={styles}
      />
      {/* CALENDAR COMPONENT  */}
      <Calendar
        setCalendarType={setCalendarType}
        calendarType={calendarType}
        styles={styles}
        date={date}
        setDate={setDate}
        calendar={calendar}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />

      {/* Day WEEKS COMPONENT  */}
      <WeekDays
        styles={styles}
        dispatch={dispatch}
        setDateAC={setDateAC}
        calendar={calendar}
        getToday={getToday}
      />
    </View>
  );
};
export default React.memo(props => <Card2 {...props} />);
const style = size =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 218 * size,
      backgroundColor: '#2A3151',
      borderBottomLeftRadius: 15 * size,
      borderBottomRightRadius: 15 * size,
    },
    textContainer: {
      height: 37 * size,
      marginLeft: 16 * size,
      marginTop: 83 * size,
      flexDirection: 'row',
    },
    textHeader: {
      flexDirection: 'row',
      width: 130 * size,
    },
    text: {
      fontFamily: 'gilroy-medium',
      fontWeight: '600',
      lineHeight: 37 * size,
      fontSize: 25 * size,
      color: 'white',
    },
    calendarText: {
      fontFamily: 'gilroy-medium',
      fontWeight: '600',
      fontSize: 20,
    },
    daysButton: {
      width: 40 * size,
      height: 50 * size,
      borderRadius: 10 * size,
      alignItems: 'center',
      marginLeft: 5 * size,
      marginTop: 33 * size,
      marginRight: 11 * size,
    },
    alldaysSize: {
      width: size / 7,
    },
    calendarfromTo: {
      width: 165 * size,
      height: 60 * size,
      borderRadius: 15,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
    },
    eraseDate: {
      borderRadius: 50 * size,
      width: 50 * size,
      height: 50 * size,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12 * size,
      marginLeft: 162 * size,
    },
    weeklydate: {
      flexDirection: 'row',
      height: 90 * size,
      marginRight: 15 * size,
      marginLeft: 16 * size,
    },
    monthYearContainer: {
      width: 160 * size,
      height: 60 * size,
      backgroundColor: 'white',
      borderRadius: 15 * size,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10 * size,
    },
    monthYearText: {
      fontFamily: 'gilroy-bold',
      fontWeight: '600',
      fontSize: 16 * size,
      lineHeight: 20 * size,
      color: '#253466',
    },
    datesBox: {
      width: 343 * size,
      height: 336 * size,
      borderRadius: 20 * size,
      backgroundColor: 'white',
      alignItems: 'center',
      paddingVertical: 26 * size,
      paddingHorizontal: 31 * size,
    },
    selectDates: {
      width: 118 * size,
      height: 24 * size,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15 * size,
    },
    calendarItemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 300 * size,
      height: 250 * size,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10 * size,
    },
    monthYearItems: {
      width: '25%',
      marginBottom: 40 * size,
      alignItems: 'center',
    },
    fromToText: {
      fontSize: 16 * size,
      fontFamily: 'gilroy-medium',
      fontWeight: '600',
      color: 'rgba(37, 52, 102, 0.5)',
    },
    fromTextView: {
      marginHorizontal: 12 * size,
      width: 2 * size,
      height: 28 * size,
      borderRadius: 2 * size,
      backgroundColor: 'rgba(37, 52, 102, 0.2)',
    },
  });
