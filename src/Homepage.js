import React from 'react';
import logo from './chess.png';
   
   
const Homepage = () => (
  <div className="homepage">
    <img src={logo} className="homepage-logo" alt="logo" />
    <p>Welcome!</p>
    <a href="/board/new">Start!</a>
  </div>
);

export default Homepage;

