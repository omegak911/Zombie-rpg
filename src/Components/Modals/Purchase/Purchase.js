import React from 'react';

import { homeBaseConfigs } from '../../../configs/config';
import { Context } from '../../../Provider';
import './Purchase.css';

const Purchase = (props) =>
  <Context.Consumer>
    {(provider) => {
      let { currentSign } = provider.state;
      let { baseProgress } = provider.state.player;
      return currentSign ?
      <div className="veilOfDarkness flexCenter">
        <div id="purchase">
          {currentSign === 'showOptions' ?
          <div className="showOptions flexCenter flexColumn">
            {Object.keys(homeBaseConfigs.buildings).map(building => {
              if (building !== 'home' && !baseProgress[building]) {
                return <button onClick={() => provider.handleSignClick(null, building)} key={building}>{building}</button>
              }
              return false
            })}
            <button onClick={provider.setCurrentSignNull}>exit</button>
          </div>
          :
          <div>
            {baseProgress[currentSign] ?
              <div className="purchaseText">
                <p>
                  Upgrade {currentSign} to level {baseProgress[currentSign].level + 1}?
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
          }
        </div>
      </div>
      :
      <div className="hide">
      </div>
    }}
</Context.Consumer>

export default Purchase;