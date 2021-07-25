import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import ProfitCalendar from '../../components/ProfitCalendar';
import Card from '../../components/Card';
import InOut from '../../components/IncomeOutcome/InOut';
import LinerChart from '../../components/LinerChart';
import ProfitList from '../../components/ProfitList';
import {useDispatch, useSelector} from 'react-redux';
import {numberWithSpaces} from '../../helpers/Container';
import {useCallback} from 'react';
import {getSalesData, getSalesGraph} from '../../store/reducers/profitReducer';

const Profit = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(getSalesGraph());
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2A3151" barStyle="light-content" />

      <Card />
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{width: 375 * data.size}}>
          <ProfitCalendar onRefresh={onRefresh} setUpdating={setUpdating} />
          <Text style={styles.totalValue}>
            + {numberWithSpaces(Math.floor(tooltipPos.value))}
          </Text>
          <LinerChart
            updating={updating}
            tooltipPos={tooltipPos}
            setTooltipPos={setTooltipPos}
          />
          <View style={styles.profitContainer}>
            <InOut />
            <InOut minus />
          </View>
          <ProfitList />
        </ScrollView>
      )}
    </View>
  );
};
export default Profit;
const style = size =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',

      backgroundColor: '#F8F9FC',
    },
    profitContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-evenly',
    },
    totalValue: {
      marginTop: 30 * size,
      color: '#4EC770',
      fontSize: 16 * size,
      fontWeight: 'bold',
      marginLeft: 16 * size,
    },
  });
