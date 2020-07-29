import React from 'react';
import Chessboard from 'react-simple-chessboard';

class Board extends React.Component {
  render() {
    var position = 'start';
    return (
      <Chessboard position={position} />
    );
  }
}

export default Board;
