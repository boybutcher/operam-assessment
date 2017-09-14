import React, { Component } from 'react';
import TreeNode from './TreeNode';

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
        <div>tree is empty!</div>
      )
    } else {
      return (
        <TreeNode node={tree} />
      )
    }
  }
}

export default TreeContainer;