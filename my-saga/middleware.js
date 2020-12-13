import { stdChannel } from './channel';
import { runSaga } from './runSaga';

function sagaMiddlewareFactory() {
  const channel = stdChannel();
  let boundRunSaga; //开始执行saga
  function sagaMiddleware({getState, dispatch}) {
    boundRunSaga = runSaga.bind(null, {
      channel, dispatch, getState
    });
    return function(next) {
      return function(action) {
        let result = next(action);
        channel.put(action);
        return result;
      }
    }
  }
  sagaMiddleware.run = (rootSaga) => {
    boundRunSaga(rootSaga);
  }
  return sagaMiddleware;
}
export default sagaMiddlewareFactory;