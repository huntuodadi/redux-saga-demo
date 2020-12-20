import { connect } from 'react-redux';
import React from 'react';

function App(props) {
  const { main, dispatch } = props;
  const login = () => {
    dispatch({
      type: 'login',
    });
  }
  const logout = () => {
    dispatch({
      type: 'logout'
    })
  }
  return (
    <div className="App">
      <button onClick={login}>login</button>
      {main.count}
      <button onClick={logout}>logout</button>
      {main.user}
    </div>
  );
}

export default connect(({main}) => ({main}), dispatch => ({dispatch}))(App);
