import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LevelOne from './Pages/Explore/LevelOne';
import Inventory from './Components/Modals/Inventory/Inventory';
import Menu from './Components/Menu/Menu';
import { Context, Provider } from './Provider';
import Base from './Pages/Base/Base';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App" className="flexCenter">
          <Provider>
            <Context.Consumer>
              {(provider) =>
                <Menu 
                  menuCoord={provider.state.menuCoord} 
                  saveGame={provider.saveGame}
                  showInventory={provider.showInventory}
                  />
              }
            </Context.Consumer>
            <Inventory />
            <Switch>
              <Context.Consumer>
              {(provider) =>
                <Route exact path='/' render={() => <Base updateMenuCoord={provider.updateMenuCoord}/>} />
              }
              </Context.Consumer>
              <Route exact path='/explore' render={() => <LevelOne />} />
            </Switch>
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
