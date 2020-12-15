import {effects} from '../redux-saga';

const fetchUserApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'zzy'
      });
    }, 2000)
  })
}

const { call, put, takeEvery, take, fork } = effects;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  const user = yield call(fetchUserApi);
  yield put({type: "USER_FETCH_SUCCEEDED", user: user});
}

function* addOne() {
  yield put({
    type: 'ADD_ONE',
  });
}

function* aaa() {}
function* bbb() {}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield fork(saga1);
  yield fork(saga2);
  yield takeEvery("FETCH_USER", fetchUser);
  yield takeEvery("ADD_ONE_SAGA", addOne);
}


function* saga1() {
  yield takeEvery("AAA", aaa);
}
function* saga2() {
  yield takeEvery("BBB", bbb);
}
export default mySaga;