import {fixFormat} from '../../helpers/utils';
import {getResource} from '../../srvCon';

const initState = {
  history: [],
  historyAll: [],
  address: [],
  categoryID: '',
  warehouseID: '',
  categoryBalance: [],
  categoryBalanceAll: [],
  UIDCategory: '',
  NomenclatureID: '',
  goodspro: [],
  goodsbal: [],
  loader: false,
  loader2: false,
  loader3: false,
  loader4: false,
  loader5: false,
};
export const warehouseListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {...state, address: action.payload};
    case 'SET_LOADER':
      return {...state, loader: action.payload};
    case 'SET_LOADER2':
      return {...state, loader2: action.payload};
    case 'SET_LOADER3':
      return {...state, loader3: action.payload};
    case 'SET_LOADER4':
      return {...state, loader4: action.payload};
    case 'SET_LOADER5':
      return {...state, loader5: action.payload};
    case 'SET_WID':
      return {...state, warehouseID: action.payload};
    case 'SET_HISTORY':
      return {...state, history: action.payload};
    case 'SET_CID':
      return {...state, categoryID: action.payload};
    case 'SET_BALANCE':
      return {...state, categoryBalance: action.payload};
    case 'SET_BALANCEALL':
      return {...state, categoryBalanceAll: action.payload};
    case 'SET_NOMID':
      return {...state, NomenclatureID: action.payload};
    case 'SET_GOODS':
      return {...state, goodspro: action.payload};
    case 'SET_GOODSBALANCE':
      return {...state, goodsbal: action.payload};
    case 'SET_HISTORYALL':
      return {...state, historyAll: action.payload};

    default:
      return {...state};
  }
};
export const setWaddressAC = payload => ({type: 'SET_ADDRESS', payload});
export const setLoader = payload => ({type: 'SET_LOADER', payload});
export const setLoader2 = payload => ({type: 'SET_LOADER2', payload});
export const setLoader3 = payload => ({type: 'SET_LOADER3', payload});
export const setLoader4 = payload => ({type: 'SET_LOADER4', payload});
export const setLoader5 = payload => ({type: 'SET_LOADER5', payload});
export const setWarehouseIDAC = payload => ({type: 'SET_WID', payload});
export const setHistoryAC = payload => ({type: 'SET_HISTORY', payload});
export const setHistoryAllAC = payload => ({type: 'SET_HISTORYALL', payload});
export const setcategoryIDAC = payload => ({type: 'SET_CID', payload});
export const setcategoryBalanceAC = payload => ({type: 'SET_BALANCE', payload});
export const setcategoryBalanceAllAC = payload => ({
  type: 'SET_BALANCEALL',
  payload,
});
export const setNomIDAC = payload => ({type: 'SET_NOMID', payload});
export const setGoodsAC = payload => ({type: 'SET_GOODS', payload});
export const setGoodsBalanceAC = payload => ({
  type: 'SET_GOODSBALANCE',
  payload,
});

export const getListAddress = () => (dispatch, getState) => {
  const login = getState().add.login;
  dispatch(setLoader(true));
  getResource('warehouses', login).then(response => {
    dispatch(setWaddressAC(response.warehouses));
    dispatch(setLoader(false));
  });
};
export const getListHistory = wID => (dispatch, getState) => {
  dispatch(setLoader2(true));

  const {login, last, first} = getState().add;
  getResource(
    `history/${fixFormat(first, true)}/${fixFormat(
      last,
      true,
    )}?UIDWarehouse=${wID}`,
    login,
  ).then(response => {
    if (response.history) {
      dispatch(setHistoryAC(response.history));
    }
    dispatch(setLoader2(false));
  });
};
export const getListHistoryAll = () => (dispatch, getState) => {
  const {login, last, first} = getState().add;
  getResource(
    `history/${fixFormat(first, true)}/${fixFormat(last, true)}`,
    login,
  ).then(response => {
    if (response.history) {
      dispatch(setHistoryAllAC(response.history));
    }
  });
};
export const getGoods = cID => (dispatch, getState) => {
  dispatch(setLoader3(true));
  const {login, last, first} = getState().add;

  const waID = getState().warehouseL.warehouseID;

  getResource(
    `goods/${fixFormat(first, true)}/${fixFormat(
      last,
      true,
    )}/${cID}?UIDWarehouse=${waID}`,
    login,
  ).then(response => {
    dispatch(setGoodsAC(response.goods));

    dispatch(setLoader3(false));
  });
};
export const getListBalance = wID => (dispatch, getState) => {
  dispatch(setLoader4(true));
  const {login, date} = getState().add;
  getResource(
    `categorybalance/${fixFormat(date, true)}?UIDWarehouse=${wID}`,
    login,
  ).then(response => {
    if (response.categoryBalance) {
      dispatch(setcategoryBalanceAC(response.categoryBalance));
    }
    dispatch(setLoader4(false));
  });
};
export const getListBalanceAll = () => (dispatch, getState) => {
  const {login, date} = getState().add;
  getResource(`categorybalance/${fixFormat(date, true)}`, login).then(
    response => {
      if (response.categoryBalance) {
        dispatch(setcategoryBalanceAllAC(response.categoryBalance));
      }
    },
  );
};
export const getBalanceGoods = cbID => (dispatch, getState) => {
  dispatch(setLoader5(true));
  const {login, date} = getState().add;
  const waID = getState().warehouseL.warehouseID;

  getResource(
    `goodsbalance/${fixFormat(date, true)}/${cbID}?UIDWarehouse=${waID}`,
    login,
  ).then(response => {
    dispatch(setGoodsBalanceAC(response.goodsBalance));

    dispatch(setLoader5(false));
  });
};
