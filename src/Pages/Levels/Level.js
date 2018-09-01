import React, { Component } from 'react';
import CharacterModel from '../../Components/CharacterModel/CharacterModel';

import Context from '../../Provider/Context';
import { levelConfigs, mapConfigs } from '../../configs/config';
import './Level.css'
class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrances: [[0,9,0,10],[9,0,10,0],[9,19,10,19],[19,9,19,10]],
      blockedEntrances: [],
      levelMatrix: mapConfigs.levels,
      playerEntrance: [0,0],
    }
  }

  async componentDidMount() {
    let level = document.getElementById('level');
    let temp = await this.state.levelMatrix.slice();

    await this.assignEntrance();
    await this.spawnStructures(); //randomly placed buildings (temp)
    // await this.setState({ levelMatrix: temp });
    await this.props.centerInitialViewOnPlayer(level);
  }

  assignEntrance = () => {
    let entranceCopy = this.state.entrances.slice();
    let randomIndex = Math.floor(Math.random() * 4);
    let entrance = entranceCopy.splice(randomIndex,1);

    this.setState({ blockedEntrances: entranceCopy, playerEntrance: entrance[0] });
  }

  spawnStructures = () => {
    console.log(this.state)
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
    let { blockedEntrances, levelMatrix, playerEntrance } = this.state;
    return (
      <div id="level" className="page">
        <div className="levelMap"
          style={{
            backgroundImage: `url(${levelConfigs.backgroundImage})`,
          }}
        >
        {blockedEntrances.map((coord,i) =>
          <div key={i}>
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
        {playerEntrance.length > 2 &&
          <Context.Consumer>
            {(provider) =>
              <CharacterModel 
                autoScroll={this.props.autoScroll} 
                baseMatrix={levelMatrix} 
                characterType="player"
                handleSignClick={provider.handleSignClick}  
                toggleConfirmTravel={provider.toggleConfirmTravel}
                startTop={playerEntrance[0] * 40}
                startLeft={playerEntrance[1] * 40}
                startColumn={playerEntrance[1]}
                startRow={playerEntrance[0]}
                />
            }
          </Context.Consumer>
        }
        </div>
      </div>
    )
  }
}

export default Level;