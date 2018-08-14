import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprites: [],
      top: 0,
      left: 0,
      backgroundPosition: ['0px 0px','0px -65px','0px -97px','0px -32px'],
      positionIndex: 0
    }
  }

  render() {
    let { characterType } = this.props
    let { top, left, backgroundPosition, positionIndex } = this.state;
    return (
      <div id="player" 
        style={{ 
          top: `${top}px`,
          left: `${left}px`,
          backgroundPosition: `${backgroundPosition[positionIndex]}` }}>
      </div>
    )
  }
}

export default Player;