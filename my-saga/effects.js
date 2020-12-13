import * as effectTypes from './effectTypes';

export const makeEffect = (type, payload) => {
  return { type, payload};
}

export function take(pattern) { // string || * || array
  return makeEffect(effectTypes.TAKE, { pattern }); // { type: 'TAKE', payload: {pattern: 'ASYNC_ADD' } } 
}

export function put(action) { // string || * || array
  return makeEffect(effectTypes.PUT, { action }); // { type: 'TAKE', payload: {pattern: 'ASYNC_ADD' } } 
}