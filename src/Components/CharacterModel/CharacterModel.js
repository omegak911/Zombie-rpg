import React, { Component } from 'react';

import { characterConfigs, movementConfigs } from '../../config';
import './CharacterModel.css';

class CharacterModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 275,
      left: 610,
      startX: 17,
      startY: 7,
      playerSprites: characterConfigs.player.spriteCrop,
      npcSprites: {
        npcMan: characterConfigs.npcMan.spriteCrop,
        npcWoman: characterConfigs.npcWoman.spriteCrop,
        npcGirl: characterConfigs.npcGirl.spriteCrop,
        npcBoy: characterConfigs.npcBoy.spriteCrop,
      },
      directions: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
      directionIndex: 0,
      throttle: Date.now(),
    }
  }

  componentDidMount() {
    const { autoScroll, characterType } = this.props;
    
    if (characterType === 'player') {
      window.addEventListener('keydown', (e) => {
        let { throttle } = this.state;
        let direction = e.key;
        let currentDate = Date.now()
        let throttler = currentDate - throttle > 100;
        if (throttler && this.checkDirectionValidity(direction)) {
          this.handleDirectionChange(direction, currentDate);
          autoScroll();
          let { startX, startY, top, left } = this.state;
          // console.log(startX, startY, top, left);
          console.log('X: ', startX);
          console.log('Y: ', startY);
          console.log('top: ', top);
          console.log('left: ', left);
        }
      })
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

  checkDirectionValidity = (direction) => {
    const { baseMatrix } = this.props;
    const [ x, y, directionIndex ] = this.directionConverter(direction);
    if (x >= 0 && y >= 0 && y < baseMatrix.length && x < baseMatrix[0].length && baseMatrix[y][x] === 1) {
      this.setState({ startX: x, startY: y, directionIndex, throttle: true })
      return true;
    } else {
      return false;
    }
  }

  directionConverter = (direction) => {
    let { startX, startY } = this.state;
    let newDirectionIndex = 0;

    if (direction === 'ArrowUp') {
      startY -= 1;
      newDirectionIndex = 2;
    } else if (direction === 'ArrowDown') {
      startY += 1;
      newDirectionIndex = 0;
    } else if (direction === 'ArrowLeft') {
      startX -= 1;
      newDirectionIndex = 3;
    } else if (direction === 'ArrowRight') {
      startX += 1;
      newDirectionIndex = 1;
    }
    return [startX, startY, newDirectionIndex];
  }

  handleDirectionChange = (direction, currentDate) => {
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
      this.setState({ [topLeft]: calculations[direction], throttle: currentDate })
    } else {
      this.setState({ [topLeft]: calculations[direction] })
    }
  }

  render() {
    let { characterType } = this.props;
    let { top, left, playerSprites, npcSprites, directionIndex} = this.state;
    let sprites = characterType === 'player' ? playerSprites : npcSprites[characterType];
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