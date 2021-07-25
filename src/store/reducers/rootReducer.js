import {combineReducers} from 'redux';
import {AddReducer} from './addReducer';
import {cashReducer} from './cashReducer';
import {profitReducer} from './profitReducer';
import {warehouseListReducer} from './warehouseListReducer';

export const rootReducer = combineReducers({
  add: AddReducer,
  cash: cashReducer,
  statistic: profitReducer,
  warehouseL: warehouseListReducer,
});
