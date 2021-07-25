import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import BodyList2 from '../../components/BodyList2';
import Card2 from '../../components/Card2';
import StoreLocation from '../../components/StoreLocation';
import {numberWithSpaces} from '../../helpers/Container';
import {useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

const Warehouse = () => {
  const goodsbalanceList = useSelector(state => state.warehouseL);
  const loader = useSelector(state => state.warehouseL.loader5);
  const [alladdress, setAlladdress] = useState(true);
  const refRBSheet = useRef();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2A3151" barStyle="light-content" />

      <Card2 warehouse1 />
      <StoreLocation setAlladdress={setAlladdress} />
      <BodyList2 alladdress={alladdress} refRBSheet={refRBSheet} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          // wrapper: {
          //   backgroundColor: 'transparent',
          // },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: '30%',
          },
        }}>
        <ScrollView>
          {loader ? (
            <ActivityIndicator size="large" color={'#5264F0'} />
          ) : goodsbalanceList.goodsbal.length > 0 ? (
            goodsbalanceList.goodsbal.map((item, i) => (
              <View key={i}>
                <Text style={{margin: 15, fontSize: 20, fontWeight: 'bold'}}>
                  Номенклатура
                </Text>

                <View
                  style={{
                    flexDirection: 'row',

                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    paddingTop: 12,
                    paddingBottom: 12,
                  }}>
                  <View style={{width: '40%', marginLeft: 16}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2A3151',
                      }}>
                      {item.Name}
                    </Text>
                  </View>
                  <View style={{width: '25%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2A3151',
                      }}>
                      {numberWithSpaces(item.Amount)} шт
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2A3151',
                      }}>
                      {numberWithSpaces(Math.floor(item.Sum))} uzs
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View />
          )}
        </ScrollView>
      </RBSheet>
    </View>
  );
};
export default Warehouse;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
