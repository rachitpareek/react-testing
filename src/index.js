import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import createSagaMiddleware from 'redux-saga'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ApplicationReducer } from './ApplicationReducer';
import { watchAllSagas } from './AppSaga';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true, trace: true })
    : compose;

const store = createStore(ApplicationReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)));

const rootSagaTask = sagaMiddleware.run(watchAllSagas);
rootSagaTask.toPromise().catch(error => {
  console.log(
    'Root Fatal Saga Error: The following exception has not been properly handled and will cause all further sagas to not work anymore. Error: ',
    error
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { store };
