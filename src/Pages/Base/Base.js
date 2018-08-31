import React, { Component } from 'react';

import CharacterModel from '../../Components/CharacterModel/CharacterModel';
// import { Context } from '../../Provider/Provider';
import Context from '../../Provider/Context';
import { homeBaseConfigs, mapConfigs } from '../../configs/config';
import './Base.css';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseMatrix: mapConfigs.home,
    }
  }

  async componentDidMount() {
    let homebase = document.getElementById('homebase');
    let { clientWidth, offsetTop, offsetLeft } = homebase;
    let menuLeft = offsetLeft + clientWidth - 80;

    let temp = await this.markSignCoordinates();
    await this.markBuildingCoordinates(temp);
    await this.props.updateMenuCoord([offsetTop, menuLeft])
    await this.setState({ baseMatrix: temp });
    await this.props.centerInitialViewOnPlayer(homebase);
  }

  autoScroll = () => {
    const homebase = document.getElementById('homebase');
    this.props.autoScroll(homebase);
  }

  //marks buildings on matrix
  markBuildingCoordinates = (temp) => {
    let { playerBaseProgress } = this.props;
    for (let building in playerBaseProgress) {
      let [row, column] = playerBaseProgress[building].coord;

      //marks signs with values of purchased buildings
      let { buildingPlotNum } = playerBaseProgress[building];
      let { signCoordinates } = homeBaseConfigs;
      let [ signRow, signColumn ] = signCoordinates[buildingPlotNum];
      temp[signRow][signColumn] = building;

      //marks building locations so player cannot traverse on them
      let rowCalc = building === 'home' ? row + 4 : row + 3;
      let colCalc = building === 'home' ? column + 4 : column + 3;
      for (let i = row; i < rowCalc; i++) {
        for (let j = column; j < colCalc; j++) {
          temp[i][j] = 0;
        }
      }
    }
    return temp;
  }

  markSignCoordinates = () => {
    let { signCoordinates } = homeBaseConfigs;
    let temp = mapConfigs.home.slice();
    for (let i = 0; i < signCoordinates.length; i++) {
      let playerHomeSignCoord = signCoordinates[i][0] === 10 && signCoordinates[i][1] === 19;
      temp[signCoordinates[i][0]][signCoordinates[i][1]] = playerHomeSignCoord ? 'home' : 'sign';
    }
    return temp;
  }

  render() {
    let { baseMatrix } = this.state;
    return (
      <div id="homebase" className="page">
        <div className="map" 
          style={{
            backgroundImage: `url(${homeBaseConfigs.backgroundImage})`,
          }}
          >
          <Context.Consumer>
            {(provider) =>
              <CharacterModel 
                autoScroll={this.autoScroll} 
                baseMatrix={baseMatrix} 
                characterType="player"
                handleSignClick={provider.handleSignClick}  
                toggleConfirmTravel={provider.toggleConfirmTravel}
                />
            }
          </Context.Consumer>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcMan" startCoord={{ startX: 21, startY: 10, top: 400, left: 840 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcWoman" startCoord={{ startX: 28, startY: 7, top: 280, left: 1120 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcGirl" startCoord={{ startX: 11, startY: 4, top: 160, left: 440 }}/>
          <CharacterModel baseMatrix={baseMatrix} characterType="npcBoy" startCoord={{ startX: 32, startY: 7, top: 280, left: 1280 }}/>
          <Context.Consumer>
            {({ state }) => {
              let { baseProgress } = state.player;
              return Object.keys(baseProgress).map( buildingName =>
                <div className="building" key={buildingName}
                  style={{ 
                    position: 'absolute',
                    backgroundImage: `url(${baseProgress[buildingName].image})`,
                    top: `${baseProgress[buildingName].top}px`, 
                    left: `${baseProgress[buildingName].left}px`,
                    width: '100%',
                    height: '100%',
                    backgroundRepeat: 'no-repeat' }}>
                </div>
              )
            }}
          </Context.Consumer>
        </div>
      </div>
    )
  }
}

export default Base;