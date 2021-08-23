import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import BodyList2 from '../../components/BodyList2';
import Chart from '../../components/Chart';

const Cashbox = () => {
  const [colorsize, setColorsize] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#2A3151'}}>
      <StatusBar backgroundColor="#2A3151" barStyle="light-content" />
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 16,
            marginRight: 300,
            fontWeight: '700',
            fontFamily: 'gilroy-bold',
            fontSize: 25,
            color: '#2A3151',
          }}>
          Касса
        </Text>

        <Chart colorsize={colorsize} categoryName={categoryName} />
        <ScrollView>
          <BodyList2
            cash
            setColorsize={setColorsize}
            setCategoryName={setCategoryName}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Cashbox;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FC', //
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
