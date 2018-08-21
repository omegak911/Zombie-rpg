import React, { Component } from 'react';

import CharacterModel from '../../Components/CharacterModel/CharacterModel';
import { characterConfigs, homeBaseConfigs, mapConfigs, movementConfigs } from '../../config';
import './Base.css';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseMatrix: mapConfigs.matrix
    }
  }

  async componentDidMount() {
    //configurations to baseMatrix here based on existing buildings/signs
    let { signCoordinates } = homeBaseConfigs;
    let temp = await mapConfigs.matrix.slice();
    for (let i = 0; i < signCoordinates.length; i++) {
      temp[signCoordinates[i][0]][signCoordinates[i][1]] = await 'sign';
    }
    await this.setState({ baseMatrix: temp });
    await this.centerInitialViewOnPlayer();
  }

  //view will auto-scroll depending on player position
  autoScroll = () => {
    const { height, width } = mapConfigs;
    const homebase = document.getElementById('homebase');
    const player = document.getElementsByClassName('player')[0];
    let { offsetLeft, offsetTop } = player;
    let { clientWidth, clientHeight, scrollLeft, scrollTop } = homebase;    
    let playerIs = {
      tooCloseToTop: (offsetTop < (scrollTop + (clientHeight * .3))) && scrollTop > 0,
      tooCloseToBottom: (offsetTop + 40 > (scrollTop + clientHeight - (clientHeight * .3))) && scrollTop < height - clientHeight,
      tooCloseToLeft: (offsetLeft < (scrollLeft + (clientWidth * .3))) && scrollLeft > 0,
      tooCloseToRight: (offsetLeft + 40 > (scrollLeft + clientWidth - (clientWidth * .3))) && scrollLeft < width - clientWidth,
    }

    if (playerIs.tooCloseToTop) {
      homebase.scrollTop -= movementConfigs.vertical;
    } else if (playerIs.tooCloseToBottom) {
      homebase.scrollTop += movementConfigs.vertical;
    } else if (playerIs.tooCloseToLeft) {
      homebase.scrollLeft -= movementConfigs.horizontal;
    } else if (playerIs.tooCloseToRight) {
      homebase.scrollLeft += movementConfigs.horizontal;
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
        <div className="homebase" 
          style={{
            backgroundImage: `url(${homeBaseConfigs.backgroundImage})`,
          }}
          >
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