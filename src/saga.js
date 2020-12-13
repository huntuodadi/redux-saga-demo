import effects from '../redux-saga';

const fetchUserApi = (id) => {
  return new Promise((resolve, reject) => {
    resolve({
      success: true,
      name: 'zzy'
    });
  })
}

const { call, put, takeEvery, takeLatest } = effects;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(fetchUserApi, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("FETCH_USER", fetchUser);
}

export default mySaga;