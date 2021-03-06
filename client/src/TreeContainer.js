import React, { Component } from 'react';
import TreeNode from './TreeNode';
import './TreeContainer.css';

class TreeContainer extends Component {
  render() {
    
    var {
      tree
    } = this.props;

    if (tree.length === 0) {
      return (
        <div className='TreeContainer'>
          The tree is empty! Click the 'Scrape Page' button to being scraping.
        </div>
      )
    } else {
      return (
        <div className='TreeContainer'>
          <TreeNode node={tree} />
        </div>
      )
    }
  }
}

export default TreeContainer;