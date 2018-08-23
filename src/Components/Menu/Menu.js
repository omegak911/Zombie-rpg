import React, { Component } from 'react';

import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: ['stats','equip','items'],
      showMenuItems: false,
    }
  }

  menuClickHandler = () => {
    this.setState({ showMenuItems: !this.state.showMenuItems })
  }

  option = (e) => {
    e.stopPropagation();
    console.log('option up options')
  }

  saveGame = (e) => {
    e.stopPropagation();
    console.log('save game');
    this.props.saveGame();
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
            <ul className="menuList">
              {menuItems.map((item,i) =>
                <li key={i}>{item}</li>
              )}
              <li onClick={this.saveGame}>save</li>
              <li onClick={this.option}>option</li>              
              <li onClick={this.menuClickHandler}>exit</li>
            </ul>
          }
        </div>
      </div>
    )
  }
}

export default Menu;