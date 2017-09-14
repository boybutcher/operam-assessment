import React, { Component } from 'react';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    var childNodes;
    var classObj;
    var style;

    if (this.props.node.children !== null) {
      childNodes = this.props.node.children.map((node, index) => {
        return (
          <li key={index}>
            <TreeNode node={node} />
          </li>
        );
      });

      if (this.state.visible) {
        classObj = 'toggleable-down';
      } else {
        classObj = 'toggleable-up';
      }
    }

    if (!this.state.visible) {
      style = {display: 'none'};
    }

    return (
      <div>
        <ul onClick={this.toggle} className={classObj}> 
          {this.props.node.name}
          <ul style={style}>
            {childNodes}
          </ul>
        </ul>
      </div>
    )
  }
}

export default TreeNode;