import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Days from './Days';
import Month from './Month';
import Year from './Year';
import moment from 'moment';
import {useCallback} from 'react';

const Calendar = ({value, onChange, startDate, endDate}) => {
  const [typeSelecting, setTypeSelecting] = useState('simple');
  const [calendarType, setCalendarType] = useState('date');
  const [date, setDate] = useState(value || new Date());
  const styles = style((Number(Dimensions.get('window').width) * 0.2667) / 100);

  useEffect(() => {
    onChange(date, typeSelecting);
  }, [date]);

  useEffect(() => {
    switch (typeSelecting) {
      case 'start':
        setDate(startDate);
        break;
      case 'end':
        setDate(endDate);
        break;

      default:
        setDate(value);
    }
  }, [typeSelecting]);

  const DaysUC = useCallback(
    () => (
      <Days
        setCalendarType={setCalendarType}
        date={date}
        setDate={setDate}
        styles={styles}
        typeSelecting={typeSelecting}
        setTypeSelecting={setTypeSelecting}
      />
    ),
    [date, typeSelecting],
  );

  const MonthUC = useCallback(
    () => (
      <Month
        setCalendarType={setCalendarType}
        date={date}
        setDate={setDate}
        styles={styles}
      />
    ),
    [],
  );

  const YearUC = useCallback(
    () => (
      <Year
        setCalendarType={setCalendarType}
        value={date}
        setDate={setDate}
        styles={styles}
      />
    ),
    [],
  );

  const StartBtn = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          setTypeSelecting(prev => {
            if (prev === 'start') return 'simple';
            return 'start';
          });
        }}
        style={{
          ...styles.monthYearContainer,
          justifyContent: 'flex-start',
          transform: [{scale: typeSelecting === 'start' ? 1.1 : 1}],
        }}>
        <View style={styles.fromToTextContainer}>
          <Text> с </Text>
        </View>
        <View style={styles.fromTextView}></View>
        <Text> {moment(startDate).format('L')}</Text>
      </TouchableOpacity>
    ),
    [startDate, typeSelecting],
  );

  const EndBtn = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          setTypeSelecting(prev => {
            if (prev === 'end') return 'simple';
            return 'end';
          });
        }}
        style={{
          ...styles.monthYearContainer,
          justifyContent: 'flex-start',
          transform: [{scale: typeSelecting === 'end' ? 1.1 : 1}],
        }}>
        <View
          style={{...styles.fromToTextContainer, backgroundColor: 'lightblue'}}>
          <Text>по </Text>
        </View>

        <View style={styles.fromTextView}></View>
        <Text>{moment(endDate).format('L')}</Text>
      </TouchableOpacity>
    ),
    [endDate, typeSelecting],
  );

  return (
    <>
      <View style={styles.monthYearButtonWrapper}>
        <TouchableOpacity
          onPress={() => setCalendarType('month')}
          style={{...styles.monthYearContainer, alignItems: 'center'}}>
          <Text style={styles.monthYearText}>Месяц</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.monthYearContainer, alignItems: 'center'}}
          onPress={() => setCalendarType('year')}>
          <Text style={styles.monthYearText}>Год</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          {
            ...styles.datesBox,
          },
          typeSelecting === 'start'
            ? {backgroundColor: 'lightgreen'}
            : typeSelecting === 'end'
            ? {backgroundColor: 'lightblue'}
            : {},
        ]}>
        <View style={styles.calendarContainer}>
          {calendarType === 'date' ? (
            <DaysUC />
          ) : calendarType === 'month' ? (
            <MonthUC />
          ) : (
            <YearUC />
          )}
        </View>
      </View>
      <View>
        <View style={styles.buttonsContainer}>
          <StartBtn />
          <EndBtn />
        </View>
      </View>
    </>
  );
};

export default Calendar;

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
    calendarContainer: {
      width: 280 * size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    monthYearButtonWrapper: {
      flexDirection: 'row',
      marginBottom: 40 * size,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    calendarfromTo: {
      width: 165 * size,
      height: 60 * size,
      borderRadius: 15,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
    },
    daysWrapContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 300 * size,
      marginTop: 22 * size,
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
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: 40 * size,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    fromToText: {
      fontSize: 16 * size,
      fontFamily: 'gilroy-medium',
      fontWeight: '600',
      color: 'rgba(37, 52, 102, 0.5)',
    },
    fromTextView: {
      marginHorizontal: 5 * size,
      width: 2 * size,
      height: 28 * size,
      borderRadius: 2 * size,
      backgroundColor: 'rgba(37, 52, 102, 0.2)',
    },
    fromToTextContainer: {
      width: 40 * size,
      height: 40 * size,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10 * size,
      borderBottomLeftRadius: 10 * size,
      backgroundColor: 'lightgreen',
    },
  });
