import React, { Component } from 'react';

import { worldMapConfigs } from '../../configs/config';
import './WorldMap.css';
class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    return (
      <div id="worldmap" className="page" style={{ backgroundImage: `url(${worldMapConfigs.backgroundImage})` }}>
        {worldMapConfigs.levelsAndPositions.map(({ level, top, left }) =>
          <div 
            key={level}
            style={{ height: '40px', width: '40px', position: 'absolute', top, left, }} 
            onClick={() => console.log('clicked ', level)}>
          </div>
        )}
      </div>
    )
  }
}

export default WorldMap;