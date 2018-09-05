import React, { Component } from 'react';

import { characterConfigs, movementConfigs } from '../../configs/config';
import './CharacterModel.css';
import { start } from 'pretty-error';

const { player } = characterConfigs;

class CharacterModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      startX: 0,
      startY: 0,
      playerSprites: player.spriteCrop,
      playerFacingDirection: [player.startRow + 1, player.startColumn],
      npcSprites: {
        npcMan: characterConfigs.npcMan.spriteCrop,
        npcWoman: characterConfigs.npcWoman.spriteCrop,
        npcGirl: characterConfigs.npcGirl.spriteCrop,
        npcBoy: characterConfigs.npcBoy.spriteCrop,
      },
      monsterSprites: {
        'Lil Zom': characterConfigs['Lil Zom'].spriteCrop,
        'Zom': characterConfigs['Zom'].spriteCrop,
        'Red Eyes White Skull': characterConfigs['Red Eyes White Skull'].spriteCrop,
        'Skeleton': characterConfigs['Skeleton'].spriteCrop,
        'War Zom': characterConfigs['War Zom'].spriteCrop,
        'Brute Zom': characterConfigs['Brute Zom'].spriteCrop,
      },
      directions: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
      directionIndex: 0,
      throttle: Date.now(),
      stats: {
        attack: 5,
        defense: 3,
        health: 20,
        exp: 1,
        loot: [],
      },
    }
  }

  componentDidMount() {
    const { characterType, startTop, startLeft, startColumn, startRow, stats } = this.props;
    if (characterType === 'player') {
      this.setState({ top: startTop, left: startLeft, startX: startColumn, startY: startRow, stats });
      window.addEventListener('keydown', this.handleKeyPress);
    } else {
      let { startX, startY, top, left } = this.props.startCoord;
      let { characterType, level } = this.props;
      let  stats = characterConfigs[characterType].stats;
      let totalStatPoints = 5 * (level - 1);

      for (let stat in stats) {
        if (stat === 'exp') {
          stats[stat] = stats[stat] * level;
        } else if (stat === 'health') {
          stats[stat] += (totalStatPoints*5);
        } else {
          let randomStatPoints = Math.floor(Math.random() * totalStatPoints);
          stats[stat] += randomStatPoints;
          totalStatPoints -= randomStatPoints;
        }
      }

      // if (baseMatrix[startY][startX]) { //if they didn't spawn on a building
      //   baseMatrix[startY][startX] = 'monster'
      // }

      this.setState({ startX, startY, top, left, stats });

      let randomSpeed = 500 + Math.random() * 1500;
      this.interval = setInterval(() => {
        let { directions } = this.state;
        let randomIndex = Math.floor(Math.random() * 4);
        let direction = directions[randomIndex];
        if (this.checkDirectionValidity(direction)) {
          this.handleCssChange(direction);
        }
      }, randomSpeed);
    }
  }

  componentWillUnmount() {
    const { characterType } = this.props;
    if (characterType === 'player') {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log(this.state)
  }

  checkDirectionValidity = (direction) => {
    const { baseMatrix, characterType, toggleConfirmTravel, type } = this.props;
    const [ x, y, directionIndex, facingCoord ] = this.directionConverter(direction);
    if (x >= 0 && y >= 0 && y < baseMatrix.length && x < baseMatrix[0].length) {
      let val = baseMatrix[y][x];
      val = typeof val === 'string' ? val.split('|')[0] : val;
      
      if (val === 1 || val === 'worldmap' || val === 'player' || val === 'monster') {
        this.checkCollisionMarkPosition(y,x);
        this.setState({ startX: x, startY: y, directionIndex, throttle: true, playerFacingDirection: facingCoord });
      } else {
        return false
      }

      if (baseMatrix[y][x] === 'worldmap' && characterType === 'player') {
        toggleConfirmTravel('worldmap');
      }
      return true;
    } else {
      return false;
    }
  }

  directionConverter = (direction) => {
    let { startX, startY } = this.state;
    let newDirectionIndex = 0;
    let facingX = startX;
    let facingY = startY;

    if (direction === 'ArrowUp') {
      startY -= 1;
      newDirectionIndex = 2;
      facingY = startY - 1;
    } else if (direction === 'ArrowDown') {
      startY += 1;
      newDirectionIndex = 0;
      facingY = startY + 1;
    } else if (direction === 'ArrowLeft') {
      startX -= 1;
      newDirectionIndex = 3;
      facingX = startX - 1;
    } else if (direction === 'ArrowRight') {
      startX += 1;
      newDirectionIndex = 1;
      facingX = startX + 1;
    }
    return [startX, startY, newDirectionIndex, [facingY, facingX]];
  }

  handleCssChange = (direction, currentDate) => {
    const calculations = {
      ArrowUp: this.state.top - movementConfigs.vertical,
      ArrowDown: this.state.top + movementConfigs.vertical,
      ArrowLeft: this.state.left - movementConfigs.horizontal,
      ArrowRight: this.state.left + movementConfigs.horizontal
    }

    let topLeft = 'top';
    if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
      topLeft = 'left';
    }
    if (currentDate) {
      this.setState({ [topLeft]: calculations[direction], throttle: currentDate });
    } else {
      this.setState({ [topLeft]: calculations[direction] });
    }
  }

  isPlayerFacingSign = () => {
    let { baseMatrix } = this.props;
    let { playerFacingDirection } = this.state;
    console.log(playerFacingDirection)

    //****delete this once we no longer need coordinates****
    let { startX, startY, top, left } = this.state; 
    console.log(`column: ${startX}`, `row: ${startY}`, `top: ${top}`, `left: ${left}`)
    
    return { 
      coordinate: playerFacingDirection,
      whatIsInFront: baseMatrix[playerFacingDirection[0]][playerFacingDirection[1]],
    }
  }

  handleKeyPress = (e) => {
    const { autoScroll } = this.props;
    let { throttle } = this.state;
    let value = e.key;
    let currentDate = Date.now()
    let throttler = currentDate - throttle > 100;
    let isDirection = {
      'ArrowUp': true,
      'ArrowDown': true,
      'ArrowLeft': true,
      'ArrowRight': true,
    }

    if (value === 'a') {
      let { coordinate, whatIsInFront} = this.isPlayerFacingSign();
      console.log(this.props.baseMatrix)
      if (isNaN(whatIsInFront)) {
        this.props.handleSignClick(coordinate, whatIsInFront);
      }
      console.log(whatIsInFront)
    } else if (isDirection[value] && throttler && this.checkDirectionValidity(value)) {
      this.handleCssChange(value, currentDate);
      autoScroll();
    }

    // let { startX, startY, top, left } = this.state; 
    // console.log(`column: ${startX}`, `row: ${startY}`, `top: ${top}`, `left: ${left}`)
  }

  checkCollisionMarkPosition = (y,x) => {
    let { type, baseMatrix } = this.props;
    let { startX, startY } = this.state;
    let checkingFor = type === 'player' ? 'monster' : 'player';
    let nextVal = baseMatrix[y][x];
    let prevVal = baseMatrix[startY][startX];
  
    if (nextVal === 'worldmap' && prevVal === 'worldmap') {
      return;
    }
    if (type === 'player') {
      nextVal = nextVal[0] === 'm' ? 'monster' : nextVal;
      prevVal = prevVal[0] === 'm' ? 'monster' : prevVal;
    }
  
    if (nextVal !== 'worldmap' && nextVal !== 'player') {
      baseMatrix[y][x] = type;
    }
    
    if ((type[0] === 'm' && prevVal !== 'worldmap' && prevVal !== 'player') || (type === 'player' && prevVal !== 'worldmap')) {
      baseMatrix[startY][startX] = 1;
    }
  
    if (nextVal === checkingFor){
      console.log('incoming collision');
      let monsterType = type === 'player' ? prevVal : type;
      let monsterIndex = monsterType.split('|')[1];
      console.log(monsterIndex)
      // this.props.initiateCombat(monsterIndex);
    } 
  
    if (prevVal === checkingFor) {
      console.log('prior collision');
      let monsterType = type === 'player' ? prevVal : type;
      let monsterIndex = monsterType.split('|')[1];
      console.log(monsterIndex)
      // this.props.initiateCombat(monsterIndex);
    }
  }

  render() {
    let { characterType } = this.props;
    let { top, left, playerSprites, npcSprites, monsterSprites, directionIndex} = this.state;
    let sprites = characterType === 'player' ? playerSprites : npcSprites[characterType] ? npcSprites[characterType] : monsterSprites[characterType];
    let classN = characterType === 'player' ? 'player' : 'npc';
    return (
      <div id="characterModel" className={classN} autoFocus={true}
        style={{ 
          backgroundImage: `url(${characterConfigs[characterType].backgroundImage})`,
          backgroundPosition: `${sprites[directionIndex]}`,
          top: `${top}px`, 
          left: `${left}px` }}>
      </div>
    )
  }
}

export default CharacterModel;