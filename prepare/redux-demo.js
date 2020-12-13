// import { createStore, applyMiddleware } from 'redux'
const { createStore } = require('redux');
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => {
      console.log('middleware:', middleware.name);
      return middleware(middlewareAPI);
    })
    dispatch = compose(...chain)(store.dispatch)
    console.log('dispatch:', dispatch);

    return {
      ...store,
      dispatch
    }
  }
}


function todoApp(state = {todos: []}, action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}

const logger1 = store => {
  return next =>  {
    console.log('logger1 next:', next);
    return action => {
      let result = next(action)
      console.log('logger1 end');
      return result
    }
  }
}

const logger2 = store => {
  return next =>  {
    console.log('logger2 next:', next);
    return action => {
      console.log('action:', action);
      let result = next(action)
      console.log('logger2 end');
      return result
    }
  }
}

const store = applyMiddleware(logger1, logger2)(createStore)(todoApp)
console.log('store:', store.getState());
console.log('dispatch returns:', store.dispatch({
  type: 'ADD_TODO',
  text: 'todo1'
}));