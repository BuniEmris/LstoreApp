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

// returns today's date.. e.g: 2019/10/12
//Get formatted date from Date object or date string "2019/..."

const Card2 = ({warehouse1 = false}) => {
  const ref = useRef();
  const calendar = useSelector(state => state.add);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [calendarType, setCalendarType] = useState('date');
  const weekdays = [' ВС ', ' ПН ', ' ВТ ', ' СР ', ' ЧТ ', ' ПТ ', ' СБ '];
  const allMonth = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july'];
  const decadeYear = ['2018', '2019', '2020', '2021', '2022', '2023'];
  const allDays = [
    '1',
    '1',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ];
  // const [fromDate, setFromDate] = useState(fixFormat(new Date()));
  // const [toDate, setToDate] = useState(fixFormat(new Date()));
  // const [selectedDate, setSelectedDate] = useState('');
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  // const DP = useCallback(() => {
  //   return (
  //     <View style={{width: 316, height: 343}}>
  //       <ModalDP
  //         {...{
  //           setModalVisible,
  //           isModalVisible,
  //           // styles,
  //           // setSelectedDate,
  //           // setFromDate,
  //           // calendar,
  //           // setToDate,
  //           // selectedDate,
  //           // dispatch,
  //           // fromDate,
  //           // toDate,
  //         }}
  //       />
  //     </View>
  //   );
  // }, []);
  // getFormatedDate(new Date(), 'YYYY/MM/DD h:m');
  // getToday();

  useEffect(() => {
    if (compareDate(new Date(), calendar.date, 'greater')) {
      dispatch(setListDateAC(createListDate(calendar.date, true)));
    }
  }, [calendar.date]);

  const setMonth = date => {
    dispatch(setPrevMonthAC(getDateMonth(date, 'prev')));
    dispatch(setCurrentMonthAC(getDateMonth(date, 'current')));
    dispatch(setNextMonthAC(getDateMonth(date, 'next')));
  };

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
            width: 360,
            backgroundColor: 'white',
            height: 410,
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setCalendarType('month')}
              style={{margin: 20, backgroundColor: 'red'}}>
              <Text style={styles.calendarText}>February</Text>
            </TouchableOpacity>
            <View
              style={{
                margin: 20,
                marginLeft: 70,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: 120,
              }}>
              <TouchableOpacity onPress={() => setCalendarType('date')}>
                <Text style={styles.calendarText}>L </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCalendarType('year')}>
                <Text style={styles.calendarText}>2021</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.calendarText}>R </Text>
              </View>
            </View>
          </View>

          <View>
            {calendarType === 'date' ? (
              <View>
                <View style={{flexDirection: 'row', marginLeft: 18}}>
                  {weekdays.map((item, index) => (
                    <TouchableOpacity style={{width: 45}} key={index}>
                      <Text
                        style={{
                          ...styles.calendarText,

                          fontSize: 14,
                          color: 'rgba(37, 52, 102, 0.5)',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      margin: 20,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {calendar.prevMonth.list.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setMonth(calendar.prevMonth.date);
                        }}>
                        <Text
                          style={{
                            ...styles.calendarText,
                            fontSize: 14,
                            color: 'rgba(37, 52, 102, 0.5)',
                            width: 45,
                            marginBottom: 30,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    {calendar.currentMonth.list.map((item, index) => (
                      <TouchableOpacity key={index}>
                        <Text
                          style={{
                            ...styles.calendarText,
                            fontSize: 14,
                            color: 'black',
                            width: 45,
                            marginBottom: 30,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    {calendar.nextMonth.list.map((item, index) => (
                      <TouchableOpacity key={index}>
                        <Text
                          style={{
                            ...styles.calendarText,
                            fontSize: 14,
                            color: 'rgba(37, 52, 102, 0.5)',
                            width: 45,
                            marginBottom: 30,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ) : calendarType === 'month' ? (
              allMonth.map((item, index) => (
                <TouchableOpacity key={index}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))
            ) : (
              decadeYear.map((item, index) => (
                <TouchableOpacity key={index}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </Modal>

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
      backgroundColor: 'red',
      flexDirection: 'row',
      height: 90 * size,
      marginRight: 15 * size,
      marginLeft: 16 * size,
    },
  });
