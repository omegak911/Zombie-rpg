import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Base from './Pages/Base/Base';
import ConfirmTravel from './Components/Modals/ConfirmTravel/ConfirmTravel';
import Context from './Provider/Context';
import Inventory from './Components/Modals/Inventory/Inventory';
import Level from './Pages/Levels/Level';
import Menu from './Components/Menu/Menu';
import Provider from './Provider/Provider';
import PurchaseModal from './Components/Modals/Purchase/Purchase';
import WorldMap from './Pages/Explore/WorldMap';


import { movementConfigs } from './configs/config';
import './App.css';

class App extends Component {

  //view will auto-scroll depending on player position
  autoScroll = (element) => {
    let { clientHeight: height, clientWidth: width } = element.children[0];
    const player = document.getElementsByClassName('player')[0];
    let { offsetLeft, offsetTop } = player;
    let { clientWidth, clientHeight, scrollLeft, scrollTop } = element;    

    let playerIs = {
      tooCloseToTop: (offsetTop < (scrollTop + (clientHeight * .3))) && scrollTop > 0,
      tooCloseToBottom: (offsetTop + 40 > (scrollTop + clientHeight - (clientHeight * .3))) && scrollTop + 2 < height - clientHeight,
      tooCloseToLeft: (offsetLeft < (scrollLeft + (clientWidth * .3))) && scrollLeft > 0,
      tooCloseToRight: (offsetLeft + 40 > (scrollLeft + clientWidth - (clientWidth * .3))) && scrollLeft < width - clientWidth,
    }

    if (playerIs.tooCloseToTop) {
      element.scrollTop -= movementConfigs.vertical;
    } else if (playerIs.tooCloseToBottom) {
      element.scrollTop += movementConfigs.vertical;
    } else if (playerIs.tooCloseToLeft) {
      element.scrollLeft -= movementConfigs.horizontal;
    } else if (playerIs.tooCloseToRight) {
      element.scrollLeft += movementConfigs.horizontal;
    }
  }

  //view will start whereever the player spawns
  centerInitialViewOnPlayer = (element) => {
    let viewMidpointX = Math.floor(element.clientWidth/2);
    let viewMidpointY = Math.floor(element.clientHeight/2);

    const { offsetTop, offsetLeft } = document.getElementsByClassName('player')[0];
    element.style.visibility = 'hidden';
    element.scrollLeft = offsetLeft - viewMidpointX + 20;  
    setTimeout(() => {
      element.scrollTop = offsetTop - viewMidpointY + 20;
      element.style.visibility = 'visible';
    }, 1000);
  }

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
              <Route exact path='/base' render={() => 
                <Context.Consumer>
                  {(provider) =>
                    <Base
                      playerBaseProgress={provider.state.player.baseProgress}
                      updateMenuCoord={provider.updateMenuCoord}
                      centerInitialViewOnPlayer={this.centerInitialViewOnPlayer}
                      autoScroll={this.autoScroll}
                      baseProgressUpdatedFalse={provider.baseProgressUpdatedFalse}
                      baseProgressUpdated={provider.state.baseProgressUpdated}
                    />
                  }
                </Context.Consumer>
              } />
              <Route path='/worldmap' render={() => 
                <Context.Consumer>
                {(provider) =>
                    <WorldMap 
                      updateMenuCoord={provider.updateMenuCoord}
                      toggleConfirmTravel={provider.toggleConfirmTravel}
                      worldMapProgress={provider.state.player.worldMapProgress}
                    />
                }
                </Context.Consumer>
              } />
              <Route path='/explore' render={() =>
                <Context.Consumer>
                {(provider) =>
                  <Level 
                    autoScroll={this.autoScroll}
                    centerInitialViewOnPlayer={this.centerInitialViewOnPlayer}
                    level={provider.state.selectedDestinationLevel}
                    initateCombat={provider.initateCombat}
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
