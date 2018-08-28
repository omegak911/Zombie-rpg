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
    
  }

  handleSignClick = () => {
    console.log('pressed playerBaseSign');
    this.setState({ currentSign: 'home' });
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