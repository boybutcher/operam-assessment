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
    this.clearDatabase = this.clearDatabase.bind(this);
  }

  fetchTree() {
    fetch('/fetch')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          tree: data
        });
      }) 
      .catch(err => {
        console.error(err);
      })
  }

  clearDatabase() {
    console.log('clearing database');
    fetch('/clear')
      .then(response => {
        this.setState({
          tree: [],
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="App">
        <TreeContainer tree={this.state.tree} fetchTree={this.fetchTree} />
        <ControlPanel clearDatabase={this.clearDatabase} />
      </div>
    );
  }
}

export default App;
