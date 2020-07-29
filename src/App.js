import React from 'react';
import './App.css';
import Homepage from './Homepage.js';
import Header from './Header.js';
import Board from './Board.js';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route path="/board">
              <Board />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
