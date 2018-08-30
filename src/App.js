import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PurchaseModal from './Components/Modals/Purchase/Purchase';
// import LevelOne from './Pages/Explore/LevelOne';
import WorldMap from './Pages/Explore/WorldMap';
import Inventory from './Components/Modals/Inventory/Inventory';
import Menu from './Components/Menu/Menu';
import Provider from './Provider/Provider';
import Context from './Provider/Context';
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
              {({ history, state, toggleConfirmTravel }) =>
                <ConfirmTravel 
                  toggleConfirmTravel={toggleConfirmTravel}
                  selectedDestination={state.selectedDestination}
                  history={history}
                />
              }
            </Context.Consumer>
            <Inventory />
            <Switch>
              <Route exact path='/' render={() => 
                <Context.Consumer>
                  {(provider) =>
                    <Base
                      playerBaseProgress={provider.state.player.baseProgress}
                      updateMenuCoord={provider.updateMenuCoord}
                    />
                  }
                </Context.Consumer>
              } />
              <Route path='/worldmap' render={() => 
                <Context.Consumer>
                {(provider) =>
                    <WorldMap 
                      toggleConfirmTravel={provider.toggleConfirmTravel}
                      worldMapProgress={provider.state.player.worldMapProgress}
                    />
                }
                </Context.Consumer>
              } />
            </Switch>
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
