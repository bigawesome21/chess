import React from 'react';
import logo from './chess.png';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img src={logo} className="header-logo" alt="chess logo"/>
	    </header>
    );
  }
}

export default Header;
