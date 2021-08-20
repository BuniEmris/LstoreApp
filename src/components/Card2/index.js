import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Calendar1 from '../Iconsvg/Calendar';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DatePicker from 'react-native-modern-datepicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  compareDate,
  createListDate,
  fixFormat,
  getDateMonth,
  getToday,
} from '../../helpers/utils';
import {
  setCurrentMonthAC,
  setDateAC,
  setFirsDatetAC,
  setLastDateAC,
  setListDateAC,
  setNextMonthAC,
  setPrevMonthAC,
} from '../../store/reducers/addReducer';
import moment from 'moment';
import {useCallback} from 'react';
import ModalDP from './ModalDP';
import Days from './CalendarComponents/Days';
import Month from './CalendarComponents/Month';
import Year from './CalendarComponents/Year';
// returns today's date.. e.g: 2019/10/12
//Get formatted date from Date object or date string "2019/..."

const Card2 = ({warehouse1 = false, value}) => {
  const ref = useRef();
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
      <View style={styles.textContainer}>
        <View style={styles.textHeader}>
          {warehouse1 ? (
            <Text style={styles.text}>Склады </Text>
          ) : (
            <Text style={styles.text}>История </Text>
          )}
        </View>

        <View style={styles.calendarText}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{marginTop: 10, flexDirection: 'row'}}>
            <Text style={{color: 'rgba(255, 255, 255, 0.5)', marginRight: 15}}>
              {moment(calendar.date).locale('ru').format('LL')}
            </Text>
            <Calendar1 />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
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
        <View style={styles.datesBox}>
          <View
            style={{
              width: 280,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {calendarType === 'date' ? (
              <Days
                setCalendarType={setCalendarType}
                date={date}
                setDate={setDate}
                styles={styles}
              />
            ) : calendarType === 'month' ? (
              <Month
                setCalendarType={setCalendarType}
                date={date}
                setDate={setDate}
                calendar={calendar}
                styles={styles}
              />
            ) : (
              <Year
                setCalendarType={setCalendarType}
                value={date}
                setDate={setDate}
                styles={styles}
              />
            )}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity style={styles.monthYearContainer}>
              <Text>c</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.monthYearContainer}>
              <Text>do</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Day WEEKS  */}
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
                onPress={() => dispatch(setDateAC(item))}
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
                  }}>
                  {getToday(item.getDay())}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  {item.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
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
      fontWeight: '600',
      lineHeight: 37 * size,
      fontSize: 30 * size,
      color: 'white',
    },
    calendarText: {
      fontWeight: 'bold',
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

      justifyContent: 'center',
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
      marginTop: 28 * size,
    },
    monthYearItems: {
      width: '25%',
      marginBottom: 42,
      alignItems: 'center',
    },
  });
