import React, { Component } from 'react';

import CharacterModel from '../../Components/CharacterModel/CharacterModel';
import { mapConfigs, movementConfigs } from '../../config';
import './Base.css';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseMatrix: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
    if (offsetTop - scrollTop < 160) { //move up
      homebase.scrollTop -= movementConfigs.vertical;
    }
  }

  centerInitialViewOnPlayer = () => {
    const homebase = document.getElementById('homebase');
    let mapMidpointX = Math.floor(mapConfigs.width/2);
    let mapMidpointY = Math.floor(mapConfigs.height/2);
    let viewMidpointX = Math.floor(homebase.clientWidth/2);
    let viewMidpointY = Math.floor(homebase.clientHeight/2);

    homebase.style.visibility = 'hidden';
    homebase.scrollLeft = mapMidpointX - viewMidpointX;
    setTimeout(() => {
      homebase.scrollTop = mapMidpointY - viewMidpointY - mapConfigs.startPositionAdjustment.midUpperCenter;
      homebase.style.visibility = 'visible';
    }, 500);
  }

  render() {
    let { baseMatrix } = this.state;
    return (
      <div id="homebase" className="page">
        <div className="homebase">
          <CharacterModel autoScroll={this.autoScroll} baseMatrix={baseMatrix} characterType="player"/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcMan" startCoord={{ startX: 18, startY: 7, top: 275, left: 650 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcWoman" startCoord={{ startX: 6, startY: 6, top: 235, left: 214 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcGirl" startCoord={{ startX: 29, startY: 10, top: 395, left: 1042 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcBoy" startCoord={{ startX: 29, startY: 6, top: 235, left: 1042 }}/>
        </div>
      </div>
    )
  }
}

export default Base;