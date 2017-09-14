import React, { Component } from 'react';

class ControlPanel extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.clearDatabase}>Clear Database</button>
      </div>
    )
  }
}

export default ControlPanel;