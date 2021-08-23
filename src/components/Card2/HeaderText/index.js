import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import CalendarIcon from '../../Iconsvg/Calendar';
const HeaderText = ({setModalVisible, warehouse1, calendar, styles}) => {
  return (
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
          <CalendarIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderText;
