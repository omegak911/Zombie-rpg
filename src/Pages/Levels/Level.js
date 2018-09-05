import React, { Component } from 'react';
import CharacterModel from '../../Components/CharacterModel/CharacterModel';

import Context from '../../Provider/Context';
import { characterConfigs, levelConfigs, mapConfigs } from '../../configs/config';
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
      numberOfEnemies: null,
      monsters: ['Lil Zom', 'Zom', 'Red Eyes White Skull', 'Skeleton', 'War Zom', 'Brute Zom'],
      mapUpdated: false,
    }
  }

  async componentDidMount() {
    let level = document.getElementById('level');
    let temp = await this.state.levelMatrix.slice();

    await this.assignEntrance();
    await this.spawnStructures(temp); //randomly placed buildings (temp)
    await this.spawnZombies();
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

  initiateCombat = (monsterIndex, stats) => {
    // this.props.initiateCombat(monsterIndex, stats, numberOfEnemies);  --if monster killed, splice it out
    console.log(monsterIndex, stats)
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
    await this.setState({ buildings, trees, levelMatrix: temp });
  }
  
  spawnZombies = () => {
    let { level } = this.props;
    let { monsters } = this.state;
    let randomNumMonsters = 10 + Math.floor(Math.random() * 20);

    let totalMonsters = []
    for (let i = 0; i < randomNumMonsters; i++) {
      let allowedIndexes = Math.floor(level/5);
      let randomIndex = Math.floor(Math.random() * allowedIndexes);
      let monster = {
        name: monsters[randomIndex],
        randomStartY: 1 + Math.floor(Math.random() * 18),
        randomStartX: 1 + Math.floor(Math.random() * 18)
      }
      monster.stats = this.createRandomStats(level, monster.name, i);
      totalMonsters.push(monster);
    }
    this.setState({ numberOfEnemies: totalMonsters, mapUpdated: true })
  }

  createRandomStats = (level, characterType, index) => {
    let stats = {...characterConfigs[characterType].stats};
    let totalStatPoints = 5 * (level - 1);

    for (let i = 0; i < 3; i++) {
      let randomStatPoints = Math.floor(Math.random() * totalStatPoints);
      totalStatPoints -= randomStatPoints;
      if (i === 0) {
        stats.attack += randomStatPoints;
      }
      if (i === 1) {
        stats.defense += randomStatPoints;
      }
      if (i === 2) {
        stats.health += (randomStatPoints * 5)
      }
    }
    stats.exp *= level;
    return stats;
  }

  render() {
    let { blockedEntrances, levelMatrix, mapUpdated, numberOfEnemies, playerEntrance, buildings, trees } = this.state;
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
                initiateCombat={provider.initiateCombat}
                />
            }
          </Context.Consumer>
        }
        {mapUpdated && numberOfEnemies.map(({ name, randomStartX, randomStartY, stats},i) => 
          <CharacterModel 
            baseMatrix={levelMatrix} 
            characterType={name}
            type={`monster|${i}`}
            index={i}
            initiateCombat={this.initiateCombat}
            key={i}
            level={level} 
            stats={stats}
            startCoord={{ startX: randomStartX, startY: randomStartY, top: randomStartY * 40, left: randomStartX * 40 }}
          />
        )}
        </div>
      </div>
    )
  }
}

export default Level;