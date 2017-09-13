import React, { Component } from 'react';
import './App.css';
import TreeContainer from './TreeContainer';
import ControlPanel from './ControlPanel';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TreeContainer />
        <ControlPanel />
      </div>
    );
  }
}

export default App;
