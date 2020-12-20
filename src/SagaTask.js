import { connect } from 'react-redux';
import React from 'react';

import {effects, channel} from '../redux-saga';

const { call, put, takeEvery, take, fork, delay } = effects;

function child1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ch1');
    }, 100)
  })
}
function child2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ch1');
    }, 300)
  })
}
function* parent() {
  window.child1 = yield fork(child1);
  window.child2 = yield fork(child2);
  yield delay(200);
}
function* main() {
  const parentTask = yield fork(parent);
  window.parentTask = parentTask;
}

export {main as saga};

function App(props) {
  const { main, dispatch } = props;
  const getInfo = () => {
    dispatch({
      type: 'MY_TAKE',
    });
  }

  return (
    <div className="App">
      <button onClick={getInfo}>request</button>
    </div>
  );
}

export default connect(({main}) => ({main}), dispatch => ({dispatch}))(App);
