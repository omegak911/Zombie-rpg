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
      playerSprites: ['0px -80px','0px -120px','0px -40px','0px 0px'],
      npcSprites: ['0px 0px','-120px 0px','-80px 0px','-40px 0px'],
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
        }
      })
    }

    if (characterType === 'npc') {
      this.setState({ startX: 12, startY: 15, top: 275, left: 650 });

      window.addEventListener('keydown', (e) => {
        let { throttle } = this.state;
        let randomIndex = Math.floor(Math.random() * 4);
        let direction = this.state.npcSprites[randomIndex];
        let currentDate = Date.now()
        let throttler = currentDate - throttle > 1000;

        if (throttler && this.checkDirectionValidity(direction)) {
          this.handleDirectionChange(direction, currentDate);
        }
      })
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

    this.setState({ [topLeft]: calculations[direction], throttle: currentDate })
  }

  render() {
    let { characterType } = this.props;
    let { top, left, playerSprites, npcSprites, directionIndex} = this.state;
    let sprites = characterType === 'player' ? playerSprites : npcSprites;
    return (
      <div id="characterModel" className={characterType} autoFocus={true}
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