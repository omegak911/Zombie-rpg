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
      {({ state }) =>
        <div id="inventory" className={state.showInventory ? 'flexCenter flexColumn' : 'hide'}>
          <div className="inventoryCoinDisplay">coin: ${state.player.coin}</div>
          <div className="inventoryBoxContainer flexCenter">
          {state.player.inventory.size.map((item, i) =>
            <div className="inventoryBoxItem" key={i}></div>
            //the item value will represent data associated with a background image, sell rate, etc
          )}
          </div>
        </div>
      }
      </Context.Consumer>
    )
  }
}

export default Inventory;