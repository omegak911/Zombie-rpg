import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PurchaseModal from './Components/Modals/Purchase/Purchase';
// import LevelOne from './Pages/Explore/LevelOne';
import WorldMap from './Pages/Explore/WorldMap';
import Inventory from './Components/Modals/Inventory/Inventory';
import Menu from './Components/Menu/Menu';
import { Context, Provider } from './Provider';
import Base from './Pages/Base/Base';
import ConfirmTravel from './Components/Modals/ConfirmTravel/ConfirmTravel';
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
            <PurchaseModal />
            <Context.Consumer>
              {({ toggleConfirmTravel }) =>
                <ConfirmTravel 
                  toggleConfirmTravel={toggleConfirmTravel}
                />
              }
            </Context.Consumer>
            <Inventory />
            <Switch>
              <Context.Consumer>
              {(provider) =>
                <Route exact path='/' render={() => 
                  <Base
                    playerBaseProgress={provider.state.player.baseProgress}
                    updateMenuCoord={provider.updateMenuCoord}/>
                  } />
              }
              </Context.Consumer>
              <Route path='/worldmap' render={() => <WorldMap />} />
            </Switch>
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
