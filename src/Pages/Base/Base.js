import React, { Component } from 'react';

import CharacterModel from '../../Components/CharacterModel/CharacterModel';
import { characterConfigs, mapConfigs, movementConfigs } from '../../config';
import './Base.css';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseMatrix: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    }
  }

  componentDidMount() {
    //configurations to baseMatrix here based on existing buildings

    this.centerInitialViewOnPlayer();
  }

  //view will auto-scroll depending on player position
  autoScroll = () => {
    const homebase = document.getElementById('homebase');
    const player = document.getElementsByClassName('player')[0];
    let { offsetLeft, offsetTop } = player;
    let { scrollLeft, scrollTop } = homebase;
    if (offsetLeft - scrollLeft > 340) { //move right
      homebase.scrollLeft += movementConfigs.horizontal;
    }
    if (offsetTop - scrollTop > 195) { //move down
      homebase.scrollTop += movementConfigs.vertical;
    }
    if (offsetLeft - scrollLeft < 300) { //move left
      homebase.scrollLeft -= movementConfigs.horizontal;
    }
    if (offsetTop - scrollTop < 150) { //move up
      homebase.scrollTop -= movementConfigs.vertical;
    }
  }

  centerInitialViewOnPlayer = () => {
    const homebase = document.getElementById('homebase');
    let viewMidpointX = Math.floor(homebase.clientWidth/2);
    let viewMidpointY = Math.floor(homebase.clientHeight/2);
    let { startTop, startLeft } = characterConfigs.player;

    homebase.style.visibility = 'hidden';
    homebase.scrollLeft = startLeft - viewMidpointX + 20;  
    setTimeout(() => {
      homebase.scrollTop = startTop - viewMidpointY + 20;
      homebase.style.visibility = 'visible';
    }, 1000);
  }

  render() {
    let { baseMatrix } = this.state;
    return (
      <div id="homebase" className="page">
        <div className="homebase">
          <CharacterModel autoScroll={this.autoScroll} baseMatrix={baseMatrix} characterType="player"/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcMan" startCoord={{ startX: 21, startY: 10, top: 400, left: 840 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcWoman" startCoord={{ startX: 28, startY: 7, top: 280, left: 1120 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcGirl" startCoord={{ startX: 11, startY: 4, top: 160, left: 440 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcBoy" startCoord={{ startX: 32, startY: 7, top: 280, left: 1280 }}/>
        </div>
      </div>
    )
  }
}

export default Base;