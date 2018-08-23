import React, { Component } from 'react';

const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseProgress: 'some sort of way to track what buildings, maybe coordinates along with numerical equivalent of the level of the buildings',
      defense: 5,
      dmg: 1,
      equipment: {

      },
      exp: 0,
      hp: 30,
      inventory: {
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
      menuCoord: [0,0],
    }
  }

  componentDidMount() {
    let playerData = JSON.parse(localStorage.getItem('playerData'));
    console.log(playerData);
  }

  saveGame = () => {
    //in react native, we will use asyncStorage

    //let's use localStorage for webVersion for now.  We can also use an actual DB if needed
    localStorage.setItem('playerData', JSON.stringify(this.state));
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
          updateMenuCoord: this.updateMenuCoord
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