import React, { Component } from 'react';

import { Provider } from './Provider';
import Base from './Pages/Base/Base';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <div id="App" className="flexCenter">
          <Base />
        </div>
      </Provider>
    );
  }
}

export default App;
