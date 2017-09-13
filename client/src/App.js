import React, { Component } from 'react';
import './App.css';
import TreeContainer from './TreeContainer';
import ControlPanel from './ControlPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: [],
    }
  }

  render() {
    return (
      <div className="App">
        <TreeContainer tree={this.state.tree}/>
        <ControlPanel />
      </div>
    );
  }
}

export default App;
