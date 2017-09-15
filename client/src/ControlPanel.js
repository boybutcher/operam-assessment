import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
  render() {
    
    var {
      tree
    } = this.props;
    
    var buttons = tree.length === 0 ? (
        <div className='buttonContainer'>
          <button onClick={this.props.initScrape}>Scrape Page</button>
          <br />
          <button onClick={this.props.fetchTree}>Fetch Tree</button>          
          <br />
          <button disabled>Clear Database</button>
        </div>
      ) : (
        <div className='buttonContainer'>
          <button disabled>Scrape Page</button>
          <br />
          <button onClick={this.props.fetchTree}>Fetch Tree</button>
          <br />
          <button onClick={this.props.clearDatabase}>Clear Database</button>
        </div>
      )

    return (
      <div className='ControlPanel'>
        <h2>Operam Scraper</h2>
        {buttons}
        <div>Developed by<br />Bryan Nguyen</div>
        <a href='https://github.com/boybutcher'>GitHub</a>
        <br />
        <a href='https://www.linkedin.com/in/bqnguyen1/'>LinkedIn</a>
      </div>
    )
  }
}

export default ControlPanel;