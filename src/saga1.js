import {effects} from '../redux-saga';

const { call, put, takeEvery, take, fork } = effects;

function* login() {
  console.log('login');
}
function* logout() {
  console.log('logout');
}
function* mySaga() {
  console.log('my saga');
  yield take('login');
  console.log('after taek');
  while(true) {
    yield take('logout');
    console.log('logout');
  }
}

export default mySaga;