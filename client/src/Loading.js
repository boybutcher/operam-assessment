import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 0,
    };
    this.tick = this.tick.bind(this);
  }

  // componentDidMount() {
  //   var timer = setInterval(this.tick, 1000);
  //   this.setState({timer});
  // }

  // componentWillUnmount() {
  //   this.clearInterval(this.state.timer);
  // }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div className='Loading'>
        <div className='string'>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>
      </div>
    )
  }

}

export default Loading;