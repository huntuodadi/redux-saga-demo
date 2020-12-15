function add(state = { count: 0, user: '' }, action) {
  switch (action.type) {
    case 'ADD_ONE':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'USER_FETCH_SUCCEEDED':
      return {
        ...state,
        user: action.user.name
      }
    default:
      return state
  }
}

export default add;