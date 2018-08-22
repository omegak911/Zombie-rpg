import React, { Component } from 'react';

const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'hello there'
    }
  }

  render() {
    return (
      <Context.Provider 
        value={{
          state: this.state,
          saveGame: () => console.log('we are gonna writefile to save'),
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