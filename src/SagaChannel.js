import { connect } from 'react-redux';
import React from 'react';

import {effects, channel} from '../redux-saga';

const { call, put, takeEvery, take, fork } = effects;

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('zzy');
    }, 1000)
  })
}

function *aa() {
  console.log('take aa');
  yield take('fdfdf');
}

function* watchRequests() {
  console.log('fork effect:', fork(aa));
  yield fork(aa);
  return;
  yield put({
    type: 'SOME_REDUX_ACTION',
    payload: 'ffsfsf'
  })
  return;
  // 创建一个 channel 来队列传入的请求
  const chan = yield call(channel)

  // 创建 3 个 worker 'threads'
  for (var i = 0; i < 3; i++) {
    yield fork(handleRequest, chan)
  }

  while (true) {
    const res = yield take('REQUEST')
    console.log('request payload:', res);
    console.log('chan:', chan);
    yield put(chan, res)
  }
}

function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan)
    const userName = yield call(getUser);
    // process the request
  }
}

export {watchRequests as saga};

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
