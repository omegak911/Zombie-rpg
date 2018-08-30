import React, { Component } from 'react';

import { worldMapConfigs } from '../../configs/config';

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    return (
      <div style={{ backgroundImage: worldMapConfigs.backgroundImage }}>
        {worldMapConfigs.levelsAndPositions.map(({ top, left }, i) =>
          <div 
            key={i}
            style={{ height: '40px', width: '40px', top, left, }} 
            onClick={() => console.log('clicked')}>
          </div>
        )}
      </div>
    )
  }
}

export default WorldMap;