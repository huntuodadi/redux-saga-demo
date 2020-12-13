import { connect } from 'react-redux';

function App(props) {
  const { main, dispatch } = props;
  const addOne = () => {
    dispatch({
      type: 'ADD_ONE',
    });
  }
  return (
    <div className="App">
      <button onClick={addOne}>Add</button>
      {main.count}
    </div>
  );
}

export default connect(({main}) => ({main}), dispatch => ({dispatch}))(App);
