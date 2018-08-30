import React, { Component } from 'react';
import { withRouter } from 'react-router';
// import { homeBaseConfigs } from './configs/config';
import { homeBaseConfigs } from '../configs/config';

import Context from './Context';
// const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        //'some sort of way to track what buildings, maybe coordinates along with numerical equivalent of the level of the buildings',
        baseProgress: {

        },
        coin: 10000,
        defense: 5,
        dmg: 1,
        equipment: {
  
        },
        exp: 0,
        hp: 30,
        inventory: {
          size: ['','','','',''],
          //items go here along with quantity
          //limit to 5, increase with bigger bags in 5s, up to 30
        },
        level: 1,
        name: '',
        storage: {
          //items go here along with quantity
        },
        totalPlaytime: '0h0m',
        zombiesKilled: 0,
        worldMapProgress: 1,
      },
      menuCoord: [0,0],
      showInventory: false,
      currentSign: null,
      expectedBuildingCoordinate: [0,0],
      nextBuildingAvailable: {
        //check baseProgress and provide next level info
      },
      selectedDestination: null,

    }
  }

  async componentDidMount() {
    let playerData = await JSON.parse(localStorage.getItem('playerData'));
    console.log(playerData);
    //update baseProgress
    if (playerData) {
      await this.setState({ player: playerData });
    }
    //then update nextBuildingAvailable
    await this.updateNextBuildingAvailable();
  }

  updateNextBuildingAvailable = () => {
    let nextBuildingAvailable = {};
    let { baseProgress } = this.state.player;
    let { buildings } = homeBaseConfigs;
    
    for (let building in buildings) {
      if (baseProgress[building]) {
        let { level } = baseProgress[building];
        //if exists in baseProgress, add next level version to next
        if (buildings[building][level + 1]) {
          nextBuildingAvailable[building] = buildings[building][level + 1];
          nextBuildingAvailable[building].level = level + 1;
        } else {
          nextBuildingAvailable[building] = 'MAXED'; //if the player already reached the max
        }
      } else {
        //else add level 1 to next
        nextBuildingAvailable[building] = buildings[building][1];
        nextBuildingAvailable[building].level = 1;
      }
    }
    this.setState({ nextBuildingAvailable });
  }

  toggleConfirmTravel = (selectedDestination) => {
    this.setState({ selectedDestination });
    console.log(this.props)
  }

  handlePurchaseOption = async (e) => {
    e.preventDefault();
    let value = e.target.value === '1'; //if the player pressed 'yes'
    let { currentSign, expectedBuildingCoordinate, player, nextBuildingAvailable } = this.state;
    let playerData = {...player};
    let nextBuildingAvailableData = {...nextBuildingAvailable};
    let propsOfNextBuilding = nextBuildingAvailableData[currentSign];

    if (value && propsOfNextBuilding.cost) {
      let { baseProgress, coin } = playerData;
      let { cost } = propsOfNextBuilding;
      if (coin >= cost) { //if the playerData has enough coin to purchase
        let { buildings, signCoordinates, buildingCoordAndTopLeft, } = homeBaseConfigs;
        let nextBuildingLevel = propsOfNextBuilding.level + 1;
        coin -= cost;
        delete propsOfNextBuilding.cost;
        for (let i = 0; i < signCoordinates.length; i++) { //find building coordinates based on sign coordinates
          if (signCoordinates[i][0] === expectedBuildingCoordinate[0] && signCoordinates[i][1] === expectedBuildingCoordinate[1]) {
            let [yAxis,xAxis,top,left] = buildingCoordAndTopLeft[i];
            propsOfNextBuilding.coord = [yAxis,xAxis];
            propsOfNextBuilding.top = top;
            propsOfNextBuilding.left = left;
            propsOfNextBuilding.buildingPlotNum = i;
          }
        }
        baseProgress[currentSign] = propsOfNextBuilding;
        if (buildings[currentSign][nextBuildingLevel]) {
          propsOfNextBuilding = buildings[currentSign][nextBuildingLevel];
          propsOfNextBuilding.level = nextBuildingLevel;
        } else {
          propsOfNextBuilding = 'MAXED'
        }
        playerData.coin = coin;
        nextBuildingAvailableData[currentSign] = propsOfNextBuilding;
        await this.setState({ playerData, nextBuildingAvailableData });
        console.log(playerData)
      } else {
        //setState explain to the player they do not have enough coin
        //have an ok button to exit;
      }
    }
    await this.setCurrentSignNull();
  }

  handleSignClick = (coordinate, whatIsInFront) => {
    console.log(`pressed ${whatIsInFront} sign`);
    coordinate = coordinate || this.state.expectedBuildingCoordinate;
    //if it's a sign, present modal with multiple choices aka first time purchase
    if (whatIsInFront === 'sign') {
      console.log('now we gotta allow player to choose from list');
      this.setState({ currentSign: 'showOptions', expectedBuildingCoordinate: coordinate });
    } else {
      //if it's the home or a purchased building, it should automatically default
      this.setState({ currentSign: whatIsInFront, expectedBuildingCoordinate: coordinate });
    }
    //we'll need to configure this to work with merchants, armory, etc
  }

  saveGame = () => {
    //in react native, we will use asyncStorage
    //let's use localStorage for webVersion for now.  We can also use an actual DB if needed
    localStorage.setItem('playerData', JSON.stringify(this.state.player));
  }

  setCurrentSignNull = () => {
    this.setState({ currentSign: null });
  }

  showInventory = () => {
    this.setState({ showInventory: !this.state.showInventory });
    console.log(this.state);
    console.log(this.props)
  }

  updateMenuCoord = (menuCoord) => {
    this.setState({ menuCoord });
  }

  render() {
    return (
      <Context.Provider 
        value={{
          state: this.state,
          saveGame: this.saveGame,
          updateMenuCoord: this.updateMenuCoord,
          showInventory: this.showInventory,
          handleSignClick: this.handleSignClick,
          handlePurchaseOption: this.handlePurchaseOption,
          setCurrentSignNull: this.setCurrentSignNull,
          toggleConfirmTravel: this.toggleConfirmTravel,
          history: this.props.history,
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default withRouter(Provider);