import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import BodyList from '../../components/BodyList';
import Card2 from '../../components/Card2';
import StoreLocation from '../../components/StoreLocation';
import BottomSheet from '../../components/BottomSheet';
import {useSelector} from 'react-redux';
const History = () => {
  const refRBSheet = useRef();
  const [alladdress, setAlladdress] = useState(true);

  const Card = useCallback(() => {
    return <Card2 />;
  }, []);
  const Location = useCallback(() => {
    return <StoreLocation setAlladdress={setAlladdress} />;
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2A3151" barStyle="light-content" />

      <Card />
      <Location />
      <View style={styles.bodyTextContainer}>
        <Text style={styles.bodyText}>TODAY</Text>
        {/* <Text style={styles.bodyText}>789 000 uzs</Text> */}
      </View>
      <BodyList alladdress={alladdress} refRBSheet={refRBSheet} />
      <BottomSheet refRBSheet={refRBSheet} />
    </View>
  );
};
export default props => <History {...props} />;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
  bodyText: {
    marginBottom: 12,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    color: 'rgba(37, 52, 102, 0.4)',
    fontSize: 14,
    fontWeight: '600',
  },
  bodyTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
