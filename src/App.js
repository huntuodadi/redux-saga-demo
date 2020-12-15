import { connect } from 'react-redux';
import React from 'react';

function App(props) {
  const { main, dispatch } = props;
  const addOne = () => {
    dispatch({
      type: 'ADD_ONE_SAGA',
    });
  }
  const fetchUser = () => {
    dispatch({
      type: 'FETCH_USER'
    })
  }
  return (
    <div className="App">
      <button onClick={addOne}>Add</button>
      {main.count}
      <button onClick={fetchUser}>fetch user</button>
      {main.user}
    </div>
  );
}

export default connect(({main}) => ({main}), dispatch => ({dispatch}))(App);
