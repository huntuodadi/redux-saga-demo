import effectRunnerMap from './effectRunnerMap';

export default function proc(env, iterator) {
  function next(args) {
    let result;
    result = iterator.next(args); // return { done: false, value: take(actionTypes.ASYNC_ADD)}
    if(!result.done) {
      runEffect(result.value, next); // value是 take put等effects的返回值
    }
  }

  function runEffect(effect, next) {
    if(effect) {
      const effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, next, { runEffect });
    }else {
      next();
    }
  }
  next();
}