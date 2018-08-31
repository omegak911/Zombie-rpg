import React, { Component } from 'react';

import { levelConfigs, mapConfigs } from '../../configs/config';
import './Level.css'
class LevelOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrances: [[0,9,0,10],[9,0,10,0],[9,19,10,19],[19,9,19,10]],
      blockedEntrances: [],
      levelMatrix: mapConfigs.levels,
      playerEntrance: [],
    }
  }

  async componentDidMount() {
    let level = document.getElementById('level');

    await this.assignEntrance();
    // let temp = this.state.levelMatrix.slice();
    // await this.spawnStructures(temp); //randomly placed buildings
    // await this.setState({ levelMatrix: temp });
    // await this.props.centerInitialViewOnPlayer(level);
  }

  assignEntrance = () => {
    let entranceCopy = this.state.entrances.slice();
    let randomIndex = Math.floor(Math.random() * 4);
    let entrance = entranceCopy.splice(randomIndex,1);

    this.setState({ blockedEntrances: entranceCopy });
  }

  spawnStructures = () => {

    //iterate thru possible building locations
    //use mathRandom to have 50/50 chance of generating it



    // with randomly generated buildings | we'll want to have designated spots so there's no conflict
    // randomly generated number of zombies 5-20
    // random 20% chance for 1-2 dead soldiers with loot
    // if zombies are still in the area, there's a 50% chance of running into a zombie when trying to escape
    // if they defeat that zombie, they have to can try to escape again with that 50%
    
    
    // zombie level will be associated with the one clicked
    // randomly assign exit | probably have an array of arrays with coordinates of possible exits with Math.random index
    
  }

  spawnZombies = () => {
    //randomly pick row/column (20x20).  Cooresponding top/left will be x40
  }

  render() {
    let { blockedEntrances } = this.state;
    return (
      <div id="level" className="page">
        <div className="levelMap"
          style={{
            backgroundImage: `url(${levelConfigs.backgroundImage})`,
          }}
        >
        {blockedEntrances.map(coord =>
          <div>
            <div style={{ 
              position: 'absolute',
              backgroundImage: `url(${levelConfigs.treeImages})`,
              backgroundPosition: '0 0',
              backgroundRepeat: 'no-repeat',
              height: '40px',
              width: '40px',
              top: coord[0] * 40,
              left: coord[1] * 40,
              }}>
            </div>
            <div style={{ 
              position: 'absolute',
              backgroundImage: `url(${levelConfigs.treeImages})`,
              backgroundPosition: '0 0',
              backgroundRepeat: 'no-repeat',
              height: '40px',
              width: '40px',
              top: coord[2] * 40,
              left: coord[3] * 40,
              }}>
            </div>
          </div>
        )}
        </div>
      </div>
    )
  }
}

export default LevelOne;