import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Days from './Days';
import Month from './Month';
import Year from './Year';
const Calendar = ({
  setCalendarType,
  calendarType,
  styles,
  date,
  setDate,
  calendar,
  isModalVisible,
  setModalVisible,
}) => {
  const [startSelecting, setStartSelecting] = useState(false);
  const [endSelecting, setEndSelecting] = useState(false);
  return (
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
      <View
        style={[
          {
            ...styles.datesBox,
          },
          startSelecting
            ? {backgroundColor: 'red'}
            : endSelecting
            ? {backgroundColor: 'blue'}
            : {},
        ]}>
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
          <TouchableOpacity
            onPress={() => {
              setStartSelecting(true);
              setEndSelecting(false);
            }}
            style={{
              ...styles.monthYearContainer,
              justifyContent: 'flex-start',
            }}>
            <Text> с </Text>
            <View style={styles.fromTextView}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEndSelecting(true);
              setStartSelecting(false);
            }}
            style={{
              ...styles.monthYearContainer,
              justifyContent: 'flex-start',
            }}>
            <Text>по </Text>
            <View style={styles.fromTextView}></View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Calendar;
