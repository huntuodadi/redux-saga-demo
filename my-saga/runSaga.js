import proc from "./proc";


export const runSaga = ({channel, dispatch, getState}, saga) => {
  let iterator = saga();
  const env = { channel, dispatch, getState };
  proc(env, iterator);
}