import React from 'react';
import './App.css';
import Homepage from './Homepage.js';
import Header from './Header.js';
import Chessboard from './Chessboard.js';
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
              <Chessboard />
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
