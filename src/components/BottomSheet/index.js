import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {numberWithSpaces} from '../../helpers/Container';
const BottomSheet = ({refRBSheet}) => {
  const goodsList = useSelector(state => state.warehouseL);
  const loader = useSelector(state => state.warehouseL.loader3);

  return (
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
        },
      }}>
      <ScrollView>
        {loader ? (
          <ActivityIndicator size="large" color={'#5264F0'} />
        ) : goodsList.goodspro.length > 0 ? (
          goodsList.goodspro.map((item, i) => (
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
                <View style={{width: '45%', marginLeft: 16}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#2A3151',
                    }}>
                    {item.Name}
                  </Text>
                </View>
                <View style={{width: '20%'}}>
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
  );
};
export default BottomSheet;
