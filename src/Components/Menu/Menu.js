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

  menuClickHandler = () => {
    this.setState({ showMenuItems: !this.state.showMenuItems })
  }

  render() {
    let { menuItems, showMenuItems } = this.state;
    let { menuCoord } = this.props;
    return (
      <div 
        id="menu" 
        className="flexCenter" 
        style={{ top: menuCoord[0], left: menuCoord[1] }}
        onClick={this.menuClickHandler}>
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