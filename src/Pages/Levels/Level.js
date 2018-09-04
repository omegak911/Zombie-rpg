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
      buildings: [],
      trees: [],
      numberOfEnemies: new Array(10 + Math.floor(Math.random() * 20)).fill(1),
      monsters: ['Lil Zom', 'Zom', 'Red Eyes White Skull', 'Skeleton', 'War Zom', 'Brute Zom'],
      mapUpdated: false,
    }
  }

  async componentDidMount() {
    let level = document.getElementById('level');
    let temp = await this.state.levelMatrix.slice();

    await this.assignEntrance();
    await this.spawnStructures(temp); //randomly placed buildings (temp)
    await this.props.centerInitialViewOnPlayer(level);
  }

  assignEntrance = () => {
    let entranceCopy = this.state.entrances.slice();
    let randomIndex = Math.floor(Math.random() * 4);
    let entrance = entranceCopy.splice(randomIndex,1);

    this.setState({ blockedEntrances: entranceCopy, playerEntrance: entrance[0] });
  }

  autoScroll = () => {
    const level = document.getElementById('level');
    this.props.autoScroll(level);
  }

  spawnStructures = async (temp) => {
    let { blockedEntrances } = this.state;
    let { possibleBuildingLocations, possibleTreeLocations, treeBackgroundPositions, buildingBackgroundPositions } = levelConfigs;
    let buildings = [];
    let trees = [];

    for (let i = 0; i < possibleTreeLocations.length; i++) {
      let buildingSpawnChance = Math.random() >= .4;
      let treeSpawnChance = Math.random() >= .5;

      if (i < 3) {
        let [ rowOne, columnOne, rowTwo, columnTwo ] = blockedEntrances[i];
        temp[rowOne][columnOne] = 0;
        temp[rowTwo][columnTwo] = 0;
      }
      if (i < possibleBuildingLocations.length && buildingSpawnChance) {
        let randomBuildingImage = buildingBackgroundPositions[Math.floor(Math.random() * buildingBackgroundPositions.length)];
        let [ row, column ] = possibleBuildingLocations[i];
        for (let i = row; i < row + 3; i++) {
          for (let k = column; k < column + 3; k++) {
            temp[i][k] = 0;
          }
        }
        buildings.push([...possibleBuildingLocations[i], randomBuildingImage]);
      }
      if (treeSpawnChance) {
        let randomTreeImage = treeBackgroundPositions[Math.floor(Math.random() * treeBackgroundPositions.length)];
        let [ row, column ] = possibleTreeLocations[i];
        temp[row][column] = 0;
        trees.push([...possibleTreeLocations[i], randomTreeImage]);
      }
    }
    await this.setState({ buildings, trees, levelMatrix: temp, mapUpdated: true });
  }
  
  spawnZombies = () => {
    // randomly generated number of zombies 5-20
    // random 20% chance for 1-2 dead soldiers with loot
    // if zombies are still in the area, there's a 50% chance of running into a zombie when trying to escape
    // if they defeat that zombie, they have to can try to escape again with that 50%
    
    
    // zombie level will be associated with the one clicked
    // randomly assign exit | probably have an array of arrays with coordinates of possible exits with Math.random index
    //randomly pick row/column (20x20).  Cooresponding top/left will be x40
  }

  render() {
    let { blockedEntrances, levelMatrix, mapUpdated, monsters, numberOfEnemies, playerEntrance, buildings, trees } = this.state;
    let { level } = this.props;
    return (
      <div id="level" className="page">
        <div className="levelMap"
          style={{
            backgroundImage: `url(${levelConfigs.backgroundImage})`,
          }}
        >
        {buildings.map((building,i) =>
          <div
            key={i}
            style={{
              height: '120px',
              width: '120px',
              position: 'absolute',
              backgroundImage: `url(${levelConfigs.buildingImages})`,
              backgroundPosition: building[2],
              backgroundRepeat: 'no-repeat',
              top: building[0] * 40,
              left: building[1] * 40,
            }}>
          </div>
        )}
        {trees.map((tree,i) =>
          <div 
            key={i}
            style={{
              height: '40px',
              width: '40px',
              position: 'absolute',
              backgroundImage: `url(${levelConfigs.treeImages})`,
              backgroundPosition: tree[2],
              backgroundRepeat: 'no-repeat',
              top: tree[0] * 40,
              left: tree[1] * 40,
            }}>
          </div>
        )

        }
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
        {mapUpdated &&
          <Context.Consumer>
            {(provider) =>
              <CharacterModel 
                autoScroll={this.autoScroll} 
                baseMatrix={levelMatrix} 
                characterType="player"
                type="player"
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
        {mapUpdated && numberOfEnemies.map((num,i) => {
          let allowedIndexes = 0;
          if (level > 4) {
            allowedIndexes += 1;
          }
          if (level > 9) {
            allowedIndexes += 1;
          }
          if (level > 14) {
            allowedIndexes += 1;
          }
          if (level > 19) {
            allowedIndexes += 1;
          }
          let randomIndex = Math.floor(Math.random() * allowedIndexes);
          let monster = monsters[randomIndex];
          let randomStartX = 1 + Math.floor(Math.random() * 18);
          let randomStartY = 1 + Math.floor(Math.random() * 18);

          return (
            <CharacterModel 
              baseMatrix={levelMatrix} 
              characterType={monster}
              type={`monster|${i}`}
              index={i}
              key={i}
              level={level} 
              startCoord={{ startX: randomStartX, startY: randomStartY, top: randomStartY * 40, left: randomStartX * 40 }}
            />
        )})}
        </div>
      </div>
    )
  }
}

export default Level;