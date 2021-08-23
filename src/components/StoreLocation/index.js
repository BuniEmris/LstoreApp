import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Red from '../Iconsvg/Red';
import Yellow from '../Iconsvg/Yellow';
import {
  getListAddress,
  setWarehouseIDAC,
} from '../../store/reducers/warehouseListReducer';

const StoreLocation = ({setAlladdress}) => {
  const location = useSelector(state => state.warehouseL);
  const data = useSelector(state => state.add);
  const loader = useSelector(state => state.warehouseL.loader);
  const styles = style(data.size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAddress());
  }, []);
  const [changeColorAll, setChangeColorAll] = useState(true);
  const [changeColor, setChangeColor] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            setChangeColorAll(true);
            setChangeColor(false);
            setAlladdress(true);
          }}
          style={styles.boxContainer}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: 2,
              color: changeColorAll ? '#5264F0' : 'rgba(37, 52, 102, 0.5)',
            }}>
            Все
          </Text>
        </TouchableOpacity>
        {loader ? (
          <ActivityIndicator size="large" color={'#5264F0'} />
        ) : (
          location.address.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setChangeColorAll(false);
                setChangeColor(item.UIDWarehouse);
                setAlladdress(false);
                dispatch(setWarehouseIDAC(item.UIDWarehouse));
              }}
              style={styles.boxContainer}>
              {!item.Warnings.yellow ? (
                item.Warnings.red ? (
                  <View style={styles.redWarning}>
                    <Red />
                  </View>
                ) : (
                  <View />
                )
              ) : (
                <View style={styles.yellowWarning}>
                  <Yellow />
                </View>
              )}

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'gilroy-medium',
                  fontWeight:
                    changeColor === item.UIDWarehouse ? 'bold' : '600',
                  color:
                    changeColor === item.UIDWarehouse
                      ? '#5264F0'
                      : 'rgba(37, 52, 102, 0.5)',
                }}>
                {item.Name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default StoreLocation;
const style = size =>
  StyleSheet.create({
    container: {
      marginTop: 20 * size,
      height: 64 * size,
      width: 380 * size,
      marginLeft: 16 * size,
    },
    boxContainer: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      marginRight: 12 * size,
      borderRadius: 20 * size,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'rgba(42, 49, 81, 0.4)',
      shadowOffset: {
        width: 0,
        height: -1,
      },
      shadowOpacity: 1,
      shadowRadius: 30 * size,

      elevation: 2,
    },
    yellowWarning: {
      position: 'absolute',
      height: 60 * size,
      right: 5 * size,
    },
    redWarning: {
      position: 'absolute',
      height: 90 * size,
      right: 15 * size,
    },
  });
