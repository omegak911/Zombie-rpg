import React, { Component } from 'react';

import configs from '../../../configs/config';
import { Context } from '../../../Provider';
import './Purchase.css';

class Purchase extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <Context.Consumer>
          {(provider) => {
            let { currentSign } = provider.state;
            let { baseProgress } = provider.state.player;
            let { homeBaseConfigs } = configs;
            currentSign ?
            <div className="veilOfDarkness">
              <div id="purchase">
                {baseProgress[currentSign] ?
                `Upgrade to level ${baseProgress[currentSign].level + 1}? \n
                $${homeBaseConfigs[currentSign][baseProgress[currentSign].level + 1].cost}
                `
                :
                `Purchase ${currentSign}?\n
                $${homeBaseConfigs[currentSign][1].cost}
                `
                }
                <div>
                <button value="1" onClick={provider.handlePurchaseOption}>Yes</button>
                <button value="0" onClick={provider.handlePurchaseOption}>No</button>
                </div>
              </div>
            </div>
            :
            <div className="hide">
            </div>
          }}
      </Context.Consumer>
    )
  }
}

export default Purchase;