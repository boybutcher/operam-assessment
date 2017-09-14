import React, { Component } from 'react';
import './TreeNode.css';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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
    var arrow;
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
        arrow = '▼';
      } else {
        classObj = 'toggleable-up';
        arrow = '▶';
      }
    }

    if (!this.state.visible) {
      style = {display: 'none'};
    }

    return (
      <ul> 
        <div className={classObj} onClick={this.toggle}>
          <a className='arrow'>{arrow}</a> {this.props.node.name} ({this.props.node.size})
        </div>
        <ul style={style}>
          {childNodes}
        </ul>
      </ul>
    )
  }
}

export default TreeNode;