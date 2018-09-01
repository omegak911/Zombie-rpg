import React, { Component } from 'react';

import { worldMapConfigs } from '../../configs/config';
import './WorldMap.css';
class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    let worldmap = document.getElementById('worldmap');

    let [ top, left ] = worldMapConfigs.backgroundHeightWidth;
    worldmap.style.visibility = 'hidden';
    worldmap.scrollLeft = left;  
    setTimeout(() => {
      worldmap.scrollTop = top;
      worldmap.style.visibility = 'visible';
    }, 1000);
  }

  handleClick = (level) => {
    let { toggleConfirmTravel, worldMapProgress } = this.props;
    let selectedDestination = level === 0 ? 'base' : 'explore/' + level;

    if (worldMapProgress < level) {
      console.log('you are too weak modal.  Come back later');
    } else {
      toggleConfirmTravel(selectedDestination);
    }
  }
  
  render() {
    return (
      <div id="worldmap" className="page">
        <div className="worldmap" style={{ backgroundImage: `url(${worldMapConfigs.backgroundImage})` }}>
        {worldMapConfigs.levelsAndPositions.map(({ level, top, left }) =>
          <div 
            key={level}
            style={{ 
              backgroundImage: `url(${this.props.worldMapProgress < level ? worldMapConfigs.soldierImage : ''})`,
              height: '40px', 
              width: '40px', 
              position: 'absolute', 
              top, 
              left, }} 
            onClick={() => this.handleClick(level)}>
          </div>
        )}
        </div>
      </div>
    )
  }
}

export default WorldMap;