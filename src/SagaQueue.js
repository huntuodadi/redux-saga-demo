import { connect } from 'react-redux';
import React from 'react';

import {effects, channel} from '../redux-saga';

const { call, put, takeEvery, take, fork } = effects;

function* child1Fork() {
  yield take('child1_action');
}
function* child2Fork() {
  yield take('child2_action');
}
function* parent() {
  const child1 = yield fork(child1Fork);
  const child2 = yield fork(child2Fork);
  window.child1 = child1;
  window.child2 = child2;
}
function* main() {
  const parentTask = yield fork(parent);
  window.parentTask = parentTask;
}

export {main as saga};

function App(props) {
  const { main, dispatch } = props;
  const run1 = () => {
    dispatch({
      type: 'child1_action'
    });
  }
  const run2 = () => {
    dispatch({
      type: 'child2_action'
    });
  }

  return (
    <div className="App">
      <button onClick={run1}>Run Child1</button>
      <button onClick={run2}>Run Child2</button>
    </div>
  );
}

export default connect(({main}) => ({main}), dispatch => ({dispatch}))(App);
