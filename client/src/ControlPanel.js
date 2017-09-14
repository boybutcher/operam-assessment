import React, { Component } from 'react';

class ControlPanel extends Component {
  render() {
    
    var {
      tree
    } = this.props;
    
    if (tree.length === 0) {
      return (
        <div>
          <button onClick={this.props.initScrape}>Scrape Page</button>
          <button disabled>Clear Database</button>
        </div>
      )
    } else {
      return (
        <div>
          <button disabled>Scrape Page</button>
          <button onClick={this.props.clearDatabase}>Clear Database</button>
        </div>
      )
    }
  }
}

export default ControlPanel;