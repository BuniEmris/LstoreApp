import {
  createListDate,
  fixFormat,
  getDate,
  getDateMonth,
  getPrevMonth,
  getToday,
} from '../../helpers/utils';
import {getResource} from '../../srvCon';
import moment from 'moment';
import 'moment/locale/ru';
import {Dimensions} from 'react-native';
const initState = {
  isauth: false,
  login: '',
  total: 0,
  first: getPrevMonth(),
  last: new Date(),
  date: new Date(),
  listDate: createListDate(new Date()),
  size: (Number(Dimensions.get('window').width) * 0.2667) / 100,
};
export const AddReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {...state, login: action.login};
    case 'setTotal':
      return {...state, total: action.total};
    case 'set_First':
      return {...state, first: action.payload};
    case 'SET_LAST_DATE':
      return {...state, last: action.payload};
    case 'SET_LIST_DATE':
      return {...state, listDate: action.payload};
    case 'SET_DATE':
      return {...state, date: action.payload};

    default:
      return {...state};
  }
};
export const setTotalAC = total => ({type: 'setTotal', total});
export const setLoginAC = login => ({type: 'SET_LOGIN', login});
export const setFirsDatetAC = payload => ({type: 'set_First', payload});
export const setLastDateAC = payload => ({type: 'SET_LAST_DATE', payload});
export const setListDateAC = payload => ({type: 'SET_LIST_DATE', payload});
export const setDateAC = payload => ({type: 'SET_DATE', payload});

export const getTotal = () => (dispatch, getState) => {
  const state = getState().add;
  getResource(
    'totalsales/' + fixFormat(state.date, true) + '/month',
    state.login,
  ).then(response => {
    dispatch(setTotalAC(response.totalSales));
  });
};
