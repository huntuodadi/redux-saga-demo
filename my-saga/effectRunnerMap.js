import * as effectTypes from './effectTypes';

/**
 * 接受effect
 * @param {*} env 
 * @param {*} payload 
 * @param {*} next 
 */
function runTakeEffect(env, payload, next) {
  const { channel, dispatch, getState } = env;
  const matcher = action => action.type === payload.pattern;
  channel.take(next, matcher);
}

/**
 * 派发effect
 * @param {*} env 
 * @param {*} payload 
 * @param {*} next 
 */
function runPutEffect(env, payload, next) {
  const { channel, dispatch, getState } = env;
  dispatch(payload.action);
  next();
}

const effectRunnerMap = {
  [effectTypes.TAKE]: runTakeEffect,
  [effectTypes.PUT]: runPutEffect, 
};
export default effectRunnerMap;