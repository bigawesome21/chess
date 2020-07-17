import React from 'react';
import logo from './chess.png';
   
   
class Homepage extends React.Component {
  render() {
    return (
      <div className="homepage">
        <img src={logo} className="homepage-logo" alt="logo" />
        <p>Welcome!</p>
        <a href="/board">Start!</a>
      </div>
    );
  }
}

export default Homepage;

