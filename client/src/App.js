import React, { Component } from 'react';
import TreeContainer from './TreeContainer';
import ControlPanel from './ControlPanel';
import Loading from './Loading';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tree: [],
    }
    this.fetchTree = this.fetchTree.bind(this);
    this.clearDatabase = this.clearDatabase.bind(this);
    this.initScrape = this.initScrape.bind(this);
  }

  fetchTree() {
    this.setState({
      loading: true,
    });
    fetch('/fetch')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          tree: data,
          loading: false,
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
    fetch('/scrape')
  }

  componentDidMount() {
    this.fetchTree();
  }

  render() {
    var {
      state: {
        tree,
        loading,
      },
      fetchTree,
      clearDatabase,
      initScrape,
    } = this;

    var mainContainer = loading ? <Loading /> : <TreeContainer tree={tree} />;

    return (
      <div className='App'>
        <ControlPanel tree={tree} clearDatabase={clearDatabase} initScrape={initScrape} fetchTree={fetchTree} />
        {mainContainer}
      </div>
    );
  }
}

export default App;
