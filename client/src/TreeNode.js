import React, { Component } from 'react';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  toggle() {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    
  }
}

export default TreeNode;