import React, { Component } from 'react';
import TreeContainer from './TreeContainer';
import ControlPanel from './ControlPanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: [],
    }
    this.fetchTree = this.fetchTree.bind(this);
    this.clearDatabase = this.clearDatabase.bind(this);
    this.initScrape = this.initScrape.bind(this);
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

  initScrape() {
    console.log('preparing to scrape')
  }

  render() {
    var {
      state: {
        tree,
      },
      fetchTree,
      clearDatabase,
      initScrape,
    } = this;

    return (
      <div className="App">
        <TreeContainer tree={tree} fetchTree={fetchTree} />
        <ControlPanel tree={tree} clearDatabase={clearDatabase} initScrape={initScrape}/>
      </div>
    );
  }
}

export default App;
