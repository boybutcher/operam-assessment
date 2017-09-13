import React, { Component } from 'react';

class TreeContainer extends Component {
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
        <div>filler tree</div>
      )
    }
  }
}

export default TreeContainer;