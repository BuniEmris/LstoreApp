import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CashitemIcon from '../Iconsvg/CashitemIcon';
import Red from '../Iconsvg/Red';
import Yellow from '../Iconsvg/Yellow';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBalanceGoods,
  getListBalance,
  getListBalanceAll,
  setcategoryIDAC,
} from '../../store/reducers/warehouseListReducer';
import {numberWithSpaces} from '../../helpers/Container';
import {getCashData} from '../../store/reducers/cashReducer';
const BodyList2 = ({
  refRBSheet,
  alladdress,
  setColorsize,
  setCategoryName,
  cash = false,
}) => {
  const balanceList = useSelector(state => state.warehouseL);
  const {data} = useSelector(state => state.cash);
  const dispatch = useDispatch();
  const state = useSelector(state => state.add);
  const styles = style(state.size);
  const loader = useSelector(state => state.warehouseL.loader4);

  const balanceListAll = useSelector(state => state.warehouseL);
  useEffect(() => {
    dispatch(getListBalanceAll());
  });

  useEffect(() => {
    dispatch(getCashData());
    balanceList.warehouseID &&
      dispatch(getListBalance(balanceList.warehouseID));
  }, [balanceList.warehouseID]);
  return (
    <View>
      {cash ? (
        <View style={styles.cashContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data && data.cashDecks.length > 0 ? (
              <>
                {data.cashDecks.map((item, v) => (
                  <TouchableOpacity
                    key={item.UIDCashDeck + v}
                    onPress={() => {
                      setCategoryName(item);
                      setColorsize(true);
                      dispatch(setcategoryIDAC(item.UIDCategory));
                    }}
                    style={styles.cashListButton}>
                    <View style={styles.buyIcon2}>
                      <CashitemIcon color={item.color} />
                    </View>
                    <View style={styles.TextButtonContainer}>
                      <View style={styles.textContainerCash}>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-ExtraBold',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginBottom: 4,
                            color: 'rgb(37, 52, 102)',
                          }}>
                          {item.Name}
                        </Text>
                      </View>
                      <View style={styles.textContainerCash2}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'rgb(37, 52, 102)',
                            textAlign: 'right',
                            marginBottom: 4,
                          }}>
                          {numberWithSpaces(Math.floor(item.Sum))} uzs
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.allAdressList}>
          {alladdress ? (
            <ScrollView>
              {balanceListAll?.categoryBalanceAll?.map((item, i) => (
                <TouchableOpacity
                  onPress={() => {
                    // dispatch(getBalanceGoods(item.UIDCategory));
                    // refRBSheet.current.open();
                  }}
                  key={i}
                  style={styles.ButtonListContainer}>
                  {!item.Warnings.yellow ? (
                    item.Warnings.red ? (
                      <View style={styles.warningContainer}>
                        <Red />
                      </View>
                    ) : (
                      <View />
                    )
                  ) : (
                    <View style={styles.warningContainer}>
                      <Yellow />
                    </View>
                  )}

                  <View style={styles.ListItems}>
                    <View style={styles.textContainer}>
                      <Text style={styles.nameStyles}>{item.Name}</Text>
                    </View>
                    <View style={styles.textContainer2}>
                      <Text style={styles.numberTextStyle}>
                        {numberWithSpaces(item.Sum)} UZS
                      </Text>

                      <Text
                        style={{
                          textAlign: 'right',
                          fontFamily: 'Gilroy-ExtraBold',
                          fontWeight: 'bold',
                          fontSize: 12,
                          color: 'rgba(37, 52, 102, 0.5)',
                        }}>
                        {numberWithSpaces(item.Amount)} шт
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : balanceList.categoryBalance.length > 0 ? (
            <ScrollView>
              {loader ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 240,
                  }}>
                  <ActivityIndicator size={32} color={'#5264F0'} />
                </View>
              ) : (
                balanceList.categoryBalance.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(getBalanceGoods(item.UIDCategory));
                      refRBSheet.current.open();
                    }}
                    key={i}
                    style={styles.ButtonListContainer}>
                    <View style={styles.ListItems}>
                      <View style={styles.textContainer}>
                        <Text style={styles.nameStyles}>{item.Name}</Text>
                      </View>
                      <View style={styles.textContainer2}>
                        <Text style={styles.numberTextStyle}>
                          {numberWithSpaces(item.Sum)} UZS
                        </Text>

                        <Text
                          style={{
                            textAlign: 'right',
                            fontFamily: 'Gilroy-ExtraBold',
                            fontWeight: 'bold',
                            fontSize: 12,
                            color: 'rgba(37, 52, 102, 0.5)',
                          }}>
                          {numberWithSpaces(item.Amount)} шт
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          ) : (
            <View>
              <Text>there is no item in Storage</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default BodyList2;

const style = size =>
  StyleSheet.create({
    cashContainer: {
      marginTop: 30 * size,
      alignItems: 'center',
      width: 380 * size,
      justifyContent: 'center',
    },

    cashListButton: {
      width: 350 * size,
      marginTop: 10 * size,
      marginBottom: 15 * size,
      marginHorizontal: 10 * size,
      height: 72,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20 * size,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    TextButtonContainer: {
      width: 280 * size,
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryButton: {
      marginHorizontal: 10 * size,
      marginTop: 16 * size,
      marginBottom: 5 * size,
      height: 72,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20 * size,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    nameStyles: {
      fontFamily: 'Gilroy-ExtraBold',
      fontWeight: 'bold',
      fontSize: 16 * size,
      marginBottom: 4 * size,
      marginLeft: 18 * size,
      marginTop: 10 * size,
      color: '#253466',
    },
    allAdressList: {
      marginTop: 30 * size,
      alignItems: 'center',
      width: 400 * size,
    },
    ButtonListContainer: {
      width: 343 * size,

      marginTop: 16 * size,
      marginBottom: 16 * size,
      marginHorizontal: 10 * size,
      height: 72,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20 * size,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    ListItems: {
      width: 343 * size,
      flexDirection: 'row',
    },
    buyIcon: {
      backgroundColor: '#F6F7F9',
      height: 51,
      width: 51 * size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10 * size,
      marginRight: 12 * size,
      marginLeft: 16 * size,
    },
    warningContainer: {
      position: 'absolute',
      height: 90,
      right: 15 * size,
    },
    buyIcon2: {
      backgroundColor: '#F6F7F9',
      height: 30,
      width: 30 * size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10 * size,
      marginRight: 12 * size,
      marginLeft: 16 * size,
    },
    textContainer: {
      width: 213 * size,
    },
    textContainer2: {
      width: 110 * size,
      marginTop: 4 * size,
    },
    textContainerCash: {
      width: 160 * size,
    },
    textContainerCash2: {
      width: 120 * size,
      marginTop: 4 * size,
    },
    numberTextStyle: {
      textAlign: 'right',
      marginBottom: 4 * size,
      fontWeight: 'bold',
      color: '#253466',
    },
  });
