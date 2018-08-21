import React, { Component } from 'react';

import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: ['stats','equip','items','save','options','exit'],
      showMenuItems: false,
    }
  }

  render() {
    let { menuItems, showMenuItems } = this.state;
    return (
      <div id="menu" className="flexCenter">
        <div className="menu">
          {showMenuItems &&
            <ul class="menuList">
              {menuItems.map(item =>
                <li>{item}</li>
              )}
            </ul>
          }
        </div>
      </div>
    )
  }
}

export default Menu;