import React, { Component } from 'react';
import TreeNode from './TreeNode';
import './TreeContainer.css';

class TreeContainer extends Component {
  componentWillMount() {
    this.props.fetchTree()
  }

  render() {
    
    var {
      tree
    } = this.props;

    if (tree.length === 0) {
      return (
        <div className='TreeContainer'>
          tree is empty!
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