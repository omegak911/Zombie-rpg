import React, { Component } from 'react';

import configs from './configs/config';

const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        //'some sort of way to track what buildings, maybe coordinates along with numerical equivalent of the level of the buildings',
        baseProgress: {

        },
        coin: 100,
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
      },
      menuCoord: [0,0],
      showInventory: false,
      currentSign: null,
      expectedBuildingCoordinate: [0,0],
      nextBuildingAvailable: {
        //check baseProgress and provide next level info
      }
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
    let { buildings } = configs.homeBaseConfigs;
    
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

  handlePurchaseOption = async (e) => {
    e.preventDefault();
    let value = e.target.value === '1';
    let { currentSign, expectedBuildingCoordinate } = this.state;
    let nextBuildingAvailable = {...this.state.nextBuildingAvailable};
    let propsOfNextBuilding = nextBuildingAvailable[currentSign];
    let player = {...this.state.player};

    if (value && propsOfNextBuilding.cost) {
      let { baseProgress, coin } = player;
      let { cost } = propsOfNextBuilding;
      if (coin >= cost) {
        let { buildings, signCoordinates, buildingCoordAndTopLeft, } = configs.homeBaseConfigs;
        let nextBuildingLevel = propsOfNextBuilding.level + 1;
        //if the player has enough coin to purchase
        coin -= cost;
        delete propsOfNextBuilding.cost;
        for (let i = 0; i < signCoordinates.length; i++) {
          //expectedBuildingCoord is the space associated with the sign
          //find the index for expectedBuildingCoord
          if (signCoordinates[i][0] === expectedBuildingCoordinate[0] && signCoordinates[i][1] === expectedBuildingCoordinate[1]) {
            let [yAxis,xAxis,top,left] = buildingCoordAndTopLeft[i];
            propsOfNextBuilding.coord = [yAxis,xAxis];
            propsOfNextBuilding.top = top;
            propsOfNextBuilding.left = left;
          }
        }
        baseProgress[currentSign] = propsOfNextBuilding;
        if (buildings[currentSign][nextBuildingLevel]) {
          propsOfNextBuilding = buildings[currentSign][nextBuildingLevel];
          propsOfNextBuilding.level = nextBuildingLevel;
        } else {
          propsOfNextBuilding = 'MAXED'
        }
        player.coin = coin;
        nextBuildingAvailable[currentSign] = propsOfNextBuilding;
        await this.setState({ player, nextBuildingAvailable });
      } else {
        //setState explain to the player they do not have enough coin
        //have an ok button to exit
      }
    }
    await this.setState({ currentSign: null })
  }

  handleSignClick = (coordinate) => {
    console.log('pressed playerBaseSign');
    this.setState({ currentSign: 'home', expectedBuildingCoordinate: coordinate });
    //we'll need to configure this to work with merchants, armory, etc
  }

  saveGame = () => {
    //in react native, we will use asyncStorage
    //let's use localStorage for webVersion for now.  We can also use an actual DB if needed
    localStorage.setItem('playerData', JSON.stringify(this.state.player));
  }

  showInventory = () => {
    this.setState({ showInventory: !this.state.showInventory });
    console.log(this.state);
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
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { Context, Provider };