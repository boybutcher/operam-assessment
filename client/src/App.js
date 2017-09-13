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
    this.fetchTree = this.fetchTree.bind(this);
  }

  fetchTree() {
    fetch('/fetch');
  }

  render() {
    return (
      <div className="App">
        <TreeContainer tree={this.state.tree} fetchTree={this.fetchTree}/>
        <ControlPanel />
      </div>
    );
  }
}

export default App;
