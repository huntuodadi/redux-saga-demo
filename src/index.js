import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from '../redux-saga'
import App from './App';
import saga from './saga';

import addReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();

// 全局你可以创建多个reducer 在这里统一在一起
const rootReducers = combineReducers({
  main: addReducer
})
// 全局就管理一个store
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
