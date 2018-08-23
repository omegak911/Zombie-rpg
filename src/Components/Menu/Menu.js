import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuItems: false,
    }
  }

  handlePropagation = (e) => {
    e.stopPropagation();
  }
  
  menuClickHandler = () => {
    this.setState({ showMenuItems: !this.state.showMenuItems });
  }
  
  option = (e) => {
    console.log('option up options');
  }
  
  showEquipment = () => {
    console.log('show equipment');
  }

  showStats = () => {
    console.log('show stats');
  }

  render() {
    let { showMenuItems } = this.state;
    let { menuCoord } = this.props;
    return (
      <div 
        id="menu" 
        className="flexCenter" 
        style={{ top: menuCoord[0], left: menuCoord[1] }}
        onClick={this.menuClickHandler}>
        <div className="menu">
          {showMenuItems &&
            <ul className="menuList" onClick={this.handlePropagation}>
              <li onClick={this.showStats}>stats</li>
              <li onClick={this.showEquipment}>equip</li>
              <li onClick={this.props.showInventory}>items</li>
              <li onClick={this.props.saveGame}>save</li>
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