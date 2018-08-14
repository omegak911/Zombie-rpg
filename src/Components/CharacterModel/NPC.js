import React, { Component } from 'react';

class NPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprites: [],
      top: 0,
      left: 0,
      backgroundPosition: [['0 0'],[],[],[]],
      positionIndex: 0
    }
  }

  render() {
    let { top, left, backgroundPosition, positionIndex } = this.state;
    return (
      <div id="npc" 
        style={{ 
          top: `${top}px`,
          left: `${left}px`,
          backgroundPosition: `${backgroundPosition[positionIndex]}` }}>
      </div>
    )
  }
}

export default NPC;