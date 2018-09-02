import React from 'react';
import Context from '../../../Provider/Context';

const ConfirmTravel = (props) => {

  const confirmTravel = (e) => {
    e.preventDefault();
    let value = e.target.value === '1';
    let { history, selectedDestination, toggleConfirmTravel } = props;
    if (value) {
      history.push('/' + selectedDestination);
    }
    toggleConfirmTravel(null, null);
  }

  return (
    <Context.Consumer>
      {({ state }) => {
        return state.selectedDestination ?
        <div className="veilOfDarkness flexCenter flexColumn">
          <p>Travel to {state.selectedDestination}?</p>
          <div>
          <button value="1" onClick={confirmTravel}>Yes</button>
          <button value="0" onClick={confirmTravel}>No</button>
          </div>
        </div>
        :
        <div className="hide">
        </div>
      }}
    </Context.Consumer>
  )
}

export default ConfirmTravel;
