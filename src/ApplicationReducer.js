import { combineReducers } from 'redux';
import { CounterReducer } from './components/counter/CounterReducer';
import { CashFlowReducer } from './components/cashflow/CashFlowReducer';

export const ApplicationReducer = combineReducers({
  counter: CounterReducer,
  cashflow: CashFlowReducer
});