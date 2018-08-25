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
            return currentSign ?
            <div className="veilOfDarkness flexCenter">
              <div id="purchase">
                {baseProgress[currentSign] ?
                  <div className="purchaseText">
                    <p>
                      Upgrade to level {baseProgress[currentSign].level + 1}?
                    </p>
                    <p>
                      ${homeBaseConfigs.buildings[currentSign][baseProgress[currentSign].level + 1].cost}
                    </p>
                  </div>
                :
                <div>
                  <p>
                    Purchase {currentSign}?
                  </p>
                  <p>
                    ${homeBaseConfigs.buildings[currentSign][1].cost}
                  </p>
                </div>
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