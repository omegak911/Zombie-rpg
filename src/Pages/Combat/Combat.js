import React, { Component } from 'react';

import './Combat.css';

class Combat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {

      },
      monster: {

      }
    }
  }

  componentDidMount() {
    //setstate player/monster stats + spriteCrop

  }

  render() {
    return (
      <div id="combat" className="page">
        <div className="combatMap">
          <div className="monsterHealth">
          </div>
          <div className="monsterName">
          </div>
          <div className="monsterSprite">
          </div>
          
          <div className="health">
          </div>
          <div className="name">
          </div>
          <div className="sprite">
          </div>
        </div>
      </div>
    )
  }
}

export default Combat;