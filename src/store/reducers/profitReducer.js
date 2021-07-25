import {fixFormat} from '../../helpers/utils';
import {getResource} from '../../srvCon';

const initState = {
  profit: 0,
  expense: 0,
  salesdata: [],
  salesgraph: [],
  salesDayWeek: [],
  type: 'Day',
};
export const profitReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PROFIT':
      return {...state, profit: action.payload};
    case 'SET_TYPE':
      return {...state, type: action.payload};
    case 'SET_EXPENSE':
      return {...state, expense: action.payload};
    case 'SET_SaleData':
      return {...state, salesdata: action.payload};
    case 'SET_SALESGRAPH':
      return {...state, salesgraph: action.payload};
    case 'SET_SALESDAYWEEK':
      return {...state, salesDayWeek: action.payload};

    default:
      return {...state};
  }
};
export const setProfitAC = payload => ({type: 'SET_PROFIT', payload});
export const setTypeAC = payload => ({type: 'SET_TYPE', payload});
export const setExpenseAC = payload => ({type: 'SET_EXPENSE', payload});
export const setDataAC = payload => ({type: 'SET_SaleData', payload});
export const setGraphAC = payload => ({type: 'SET_SALESGRAPH', payload});
export const setSalesDayWeekAC = payload => ({
  type: 'SET_SALESDAYWEEK',
  payload,
});

export const getStatistics = () => (dispatch, getState) => {
  const type = getState().statistic.type;

  const {login, date} = getState().add;
  getResource(
    `profitexpense/${fixFormat(date, true)}/` + type.toLowerCase(),
    login,
  ).then(response => {
    dispatch(setProfitAC(response.statistics.profit));
    dispatch(setExpenseAC(response.statistics.expense));
  });
};

export const getSalesData = () => (dispatch, getState) => {
  const type = getState().statistic.type;

  const {login, date} = getState().add;
  getResource(
    `warehousessales/${fixFormat(date, true)}/` + type.toLowerCase(),
    login,
  ).then(response => {
    dispatch(setDataAC(response.data));
  });
};
export const getSalesGraph = () => (dispatch, getState) => {
  const type = getState().statistic.type;
  const {login, date} = getState().add;

  getResource(
    `salesgraph/${fixFormat(date, true)}/` + type.toLowerCase(),
    login,
  ).then(response => {
    dispatch(setGraphAC(response.graph));
  });
};
