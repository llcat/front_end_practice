import React, { Component } from 'react';
import Calculator from './components/Calculator'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="main-container">
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
