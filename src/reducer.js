function add(state = { count: 0 }, action) {
  switch (action.type) {
    case 'ADD_ONE':
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}

export default add;