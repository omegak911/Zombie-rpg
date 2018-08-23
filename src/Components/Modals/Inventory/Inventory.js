import React, { Component } from 'react';

import { Context } from '../../../Provider';
import './Inventory.css';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Context.Consumer>
      {(provider) =>
        <div id="inventory" className={provider.state.showInventory ? 'flexCenter flexColumn' : 'hide'}>
          <div className="inventoryCoinDisplay">coin: ${provider.state.player.coin}</div>
          <div className="inventoryBoxContainer flexCenter">
          {provider.state.player.inventory.size.map((inventoryBox, i) =>
            <div className="inventoryBoxItem" key={i}></div>
          )}
          </div>
        </div>
      }
      </Context.Consumer>
    )
  }
}

export default Inventory;