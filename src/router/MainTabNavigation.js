import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfitIcon from '../components/Iconsvg/ProfitIcon';
import HistoryIcon from '../components/Iconsvg/HistoryIcon';
import WarehouseIcon from '../components/Iconsvg/WarehouseIcon';
import CashboxIcon from '../components/Iconsvg/CashboxIcon';
import Profit from '../screens/Profit';
import History from '../screens/History';
import Warehouse from '../screens/Warehouse';
import Cashbox from '../screens/Cashbox';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import CalendarScreen from '../screens/CalendarScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const MainTabNavigation = () => {
  const [Page, setPage] = useState(<Profit />);
  const [changeColor, setChangeColor] = useState('Прибыль');

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 9}}>{Page}</View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#F8F9FC',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setPage(<Profit />), setChangeColor('Прибыль');
          }}>
          <ProfitIcon changeColor={changeColor} />
          <Text
            style={{
              ...styles.iconText,
              color:
                changeColor === 'Прибыль'
                  ? '#253466'
                  : 'rgba(62, 71, 112, 0.5)',
              marginTop: 13,
            }}>
            Прибыль
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setPage(<History />), setChangeColor('История');
          }}>
          <HistoryIcon changeColor={changeColor} />
          <Text
            style={{
              ...styles.iconText,
              color:
                changeColor === 'История'
                  ? '#253466'
                  : 'rgba(62, 71, 112, 0.5)',
              marginTop: 13,
            }}>
            История
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setPage(
              <Warehouse
                nav={() => {
                  setPage(<CalendarScreen />);
                }}
              />,
            ),
              setChangeColor('Склады');
          }}>
          <WarehouseIcon changeColor={changeColor} />
          <Text
            style={{
              ...styles.iconText,
              color:
                changeColor === 'Склады' ? '#253466' : 'rgba(62, 71, 112, 0.5)',
              marginTop: 13,
            }}>
            Склады
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setPage(<Cashbox />), setChangeColor('Касса');
          }}>
          <CashboxIcon changeColor={changeColor} />
          <Text
            style={{
              ...styles.iconText,
              color:
                changeColor === 'Касса' ? '#253466' : 'rgba(62, 71, 112, 0.5)',
              marginTop: 13,
            }}>
            Касса
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainTabNavigation;
const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'gilroy-medium',
  },
});

// <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({tintColor}) => {
//           let iconName;
//           switch (route.name) {
//             case 'Profit':
//               iconName = <ProfitIcon color={tintColor} />;
//               return iconName;
//             case 'History':
//               iconName = <HistoryIcon color={tintColor} />;
//               return iconName;
//             case 'Warehouse':
//               iconName = <WarehouseIcon tintColor={tintColor} />;
//               return iconName;
//             case 'Cashbox':
//               iconName = <CashboxIcon tintColor={tintColor} />;
//               return iconName;
//           }

//           // You can return any component that you like here!
//         },
//       })}
//       tabBarOptions={{
//         // activeBackgroundColor: '#51E1ED',
//         activeTintColor: '#253466', // tab text color
//         inactiveTintColor: 'rgba(37, 52, 102, 0.4)',
//         style: {
//           height: 88,
//         },
//         labelStyle: {
//           marginTop: 7,
//           marginBottom: 31,
//         },
//       }}>
//       <Tab.Screen name="Profit" component={Profit} />
//       <Tab.Screen name="History" component={History} />
//       <Tab.Screen name="Warehouse" component={Warehouse} />
//       <Tab.Screen name="Cashbox" component={Cashbox} />
//     </Tab.Navigator>
