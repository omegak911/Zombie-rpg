import React, { Component } from 'react';

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
    }
  }

  componentDidMount() {
    let playerData = JSON.parse(localStorage.getItem('playerData'));
    console.log(playerData);
  }

  handlePurchaseOption = (e) => {
    e.preventDefault();
    let { value } = e.target;
    console.log('handlePurchaseOption val: ', value);
    this.setState({ currentSign: null })
  }

  handleSignClick = () => {
    console.log('pressed playerBaseSign');
    this.setState({ currentSign: 'home' });
    //make sure to change it back to null on completion
    //we'll need to configure this to work with merchants, armory, etc
  }

  saveGame = () => {
    //in react native, we will use asyncStorage
    //let's use localStorage for webVersion for now.  We can also use an actual DB if needed
    localStorage.setItem('playerData', JSON.stringify(this.state));
  }

  showInventory = () => {
    this.setState({ showInventory: !this.state.showInventory })
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
          //we can write functions here to update state
          //if we need the function to be used inside another function on the component
          //we can pass it down as a prop one level up
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { Context, Provider };