import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import Pie from 'react-native-pie';
import {VictoryPie} from 'victory-native';
import {numberWithSpaces} from '../../helpers/Container';
import {getCashData} from '../../store/reducers/cashReducer';
const Chart = ({categoryName}) => {
  const {data} = useSelector(state => state.cash);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    dispatch(getCashData());
  }, []);
  useEffect(() => {
    if (data?.cashDecks)
      setChartData(
        data.cashDecks.map(item => ({
          name: item.UIDCashDeck,
          x: ' ',
          y: item.Sum,
        })),
      );
  }, [data]);

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '70%',
          height: 254,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <VictoryPie
          colorScale={data ? data.cashDecks.map(item => item.color) : []}
          data={chartData}
          labelRadius={({innerRadius}) => innerRadius + 5}
          radius={({datum}) => {
            if (datum.name === categoryName.UIDCashDeck) return 125;
            else return 120;
          }}
          innerRadius={70}
          style={{labels: {fill: 'white', fontSize: 20, fontWeight: 'bold'}}}
        />
      </View>
      {categoryName.Name ? (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text
            style={{
              color: 'rgba(37, 52, 102, 0.5)',
              fontWeight: '600',
              fontSize: 12,
              marginBottom: 7,
            }}>
            {categoryName.Name}
          </Text>
          <Text
            style={{
              color: 'rgb(37, 52, 102)',
              fontSize: 16,
              fontWeight: '800',
            }}>
            {numberWithSpaces(Math.floor(categoryName.Sum))} uzs
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Chart;
