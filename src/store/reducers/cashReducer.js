import {colorGenerator, fixFormat} from '../../helpers/utils';
import {getResource} from '../../srvCon';

const initState = {
  data: null,
};
export const cashReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {...state, data: action.payload};

    default:
      return {...state};
  }
};
export const setDataAC = payload => ({type: 'SET_DATA', payload});

export const getCashData = () => (dispatch, getState) => {
  const {login, date} = getState().add;
  getResource('cashdecks/' + fixFormat(date, true), login).then(response => {
    const data = {
      ...response.data,
      cashDecks: response.data.cashDecks.map(item => ({
        ...item,
        color: colorGenerator(),
      })),
    };
    dispatch(setDataAC(data));
  });
};
