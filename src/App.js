import React from 'react';
import './App.css';
import Homepage from './Homepage.js';
import Header from './Header.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Homepage />
      </div>
    );
  }
}

export default App;
