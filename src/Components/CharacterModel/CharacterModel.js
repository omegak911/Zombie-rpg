import React, { Component } from 'react';

import characterConfigs from '../../config';
import './CharacterModel.css';

class CharacterModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 275,
      left: 610,
      startX: 6,
      startY: 8,
      playerSprites: ['0px -80px','0px -120px','0px -40px','0px 0px'],
      npcSprites: ['0px 0px','-120px 0px','-80px 0px','-40px 0px'],
      directionIndex: 0,
    }
  }

  componentDidMount() {
    const { characterType } = this.props;

    if (characterType === 'player') {
      window.addEventListener('keydown', (e) => {
        let direction = e.key;
  
        if (this.checkDirectionValidity(direction)) {
          this.handleDirectionChange(direction);
          console.log(this.state);
        }
      })
    }

    if (characterType === 'npc') {
      this.setState({ startX: 12, startY: 15, top: 275, left: 650 });

      window.addEventListener('keydown', (e) => {
        let randomIndex = Math.floor(Math.random() * 4);
        let direction = this.state.npcSprites[randomIndex];

        if (this.checkDirectionValidity(direction)) {
          this.handleDirectionChange(direction);
        }
      })
    }
  }

  checkDirectionValidity = (direction) => {
    const { baseMatrix } = this.props;
    const [ x, y, directionIndex ] = this.directionConverter(direction);

    if (x >= 0 && y >= 0 && x < baseMatrix.length && y < baseMatrix[0].length && baseMatrix[x][y] === 1) {
      this.setState({ startX: x, startY: y, directionIndex })
      return true;
    } else {
      return false;
    }

  }

  directionConverter = (direction) => {
    let { startX, startY } = this.state;
    let newDirectionIndex = 0;
    if (direction === 'ArrowUp') {
      startX -= 1;
      newDirectionIndex = 2;
    } else if (direction === 'ArrowDown') {
      startX += 1;
      newDirectionIndex = 0;
    } else if (direction === 'ArrowLeft') {
      startY -= 1;
      newDirectionIndex = 3;
    } else if (direction === 'ArrowRight') {
      startY += 1;
      newDirectionIndex = 1;
    }
    return [startX, startY, newDirectionIndex];
  }

  handleDirectionChange = (direction) => {
    if (direction === 'ArrowUp') {
      this.setState({ top: this.state.top - 40 })
    } else if (direction === 'ArrowDown') {
      this.setState({ top: this.state.top + 40 })
    } else if (direction === 'ArrowLeft') {
      this.setState({ left: this.state.left - 40 })
    } else if (direction === 'ArrowRight') {
      this.setState({ left: this.state.left + 40 })
    }
  }

  render() {
    let { characterType } = this.props;
    let { top, left, playerSprites, npcSprites, directionIndex} = this.state;
    let sprites = characterType === 'player' ? playerSprites : npcSprites;
    return (
      <div id="characterModel" className={characterType}
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