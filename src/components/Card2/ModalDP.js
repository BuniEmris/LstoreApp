import React from 'react';
import {Text, TextInput, Modal, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {compareDate, fixFormat} from '../../helpers/utils';
import {
  setDateAC,
  setFirsDatetAC,
  setLastDateAC,
} from '../../store/reducers/addReducer';

export default React.memo(
  ({
    setModalVisible,
    isModalVisible,
    // styles,
    // calendar,
    // setToDate,
    // selectedDate,
    // dispatch,
    // fromDate,
    // setSelectedDate,
    // setFromDate,
    // toDate,
  }) => {
    console.log('working');
    return (
      <Modal
        style={{width: 316, height: 340}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <Text>SSSSSSSSSSSSSSss</Text>
      </Modal>
    );
  },
);
