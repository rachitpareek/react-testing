import { all, fork } from 'redux-saga/effects';
import cashFlowSaga from './components/cashflow/CashFlowSaga';

export function* watchAllSagas() {
  yield all([
    fork(cashFlowSaga)
  ]);
}
