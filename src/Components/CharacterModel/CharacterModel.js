import React, { Component } from 'react';

import configs from '../../configs/config';
import './CharacterModel.css';

const { player } = configs.characterConfigs;

class CharacterModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: player.startTop,
      left: player.startLeft,
      startX: player.startColumn,
      startY: player.startRow,
      playerSprites: player.spriteCrop,
      playerFacingDirection: [player.startRow + 1, player.startColumn],
      npcSprites: {
        npcMan: configs.characterConfigs.npcMan.spriteCrop,
        npcWoman: configs.characterConfigs.npcWoman.spriteCrop,
        npcGirl: configs.characterConfigs.npcGirl.spriteCrop,
        npcBoy: configs.characterConfigs.npcBoy.spriteCrop,
      },
      directions: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
      directionIndex: 0,
      throttle: Date.now(),
    }
  }

  componentDidMount() {
    const { characterType } = this.props;
    
    if (characterType === 'player') {
      window.addEventListener('keydown', this.handleKeyPress);
    } else {
      let { startX, startY, top, left } = this.props.startCoord;
      this.setState({ startX, startY, top, left });

      setInterval(() => {
        let { directions } = this.state;
        let randomIndex = Math.floor(Math.random() * 4);
        let direction = directions[randomIndex];

        if (this.checkDirectionValidity(direction)) {
          this.handleDirectionChange(direction);
        }
      }, 2000);
    }
  }

  componentWillUnmount() {
    const { characterType } = this.props;
    if (characterType === 'player') {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  checkDirectionValidity = (direction) => {
    const { baseMatrix } = this.props;
    const [ x, y, directionIndex, facingCoord ] = this.directionConverter(direction);
    if (x >= 0 && y >= 0 && y < baseMatrix.length && x < baseMatrix[0].length && baseMatrix[y][x] === 1) {
      this.setState({ startX: x, startY: y, directionIndex, throttle: true, playerFacingDirection: facingCoord });
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

  handleDirectionChange = (direction, currentDate) => {
    const calculations = {
      ArrowUp: this.state.top - configs.movementConfigs.vertical,
      ArrowDown: this.state.top + configs.movementConfigs.vertical,
      ArrowLeft: this.state.left - configs.movementConfigs.horizontal,
      ArrowRight: this.state.left + configs.movementConfigs.horizontal
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
      if (isNaN(whatIsInFront)) {
        this.props.handleSignClick(coordinate, whatIsInFront);
      }
      console.log(whatIsInFront)
    } else if (isDirection[value] && throttler && this.checkDirectionValidity(value)) {
      this.handleDirectionChange(value, currentDate);
      autoScroll();
    }

    // let { startX, startY, top, left } = this.state; 
    // console.log(`column: ${startX}`, `row: ${startY}`, `top: ${top}`, `left: ${left}`)
  }

  render() {
    let { characterType } = this.props;
    let { top, left, playerSprites, npcSprites, directionIndex} = this.state;
    let sprites = characterType === 'player' ? playerSprites : npcSprites[characterType];
    let classN = characterType === 'player' ? 'player' : 'npc';
    return (
      <div id="characterModel" className={classN} autoFocus={true}
        style={{ 
          backgroundImage: `url(${configs.characterConfigs[characterType].backgroundImage})`,
          backgroundPosition: `${sprites[directionIndex]}`,
          top: `${top}px`, 
          left: `${left}px` }}>
      </div>
    )
  }
}

export default CharacterModel;