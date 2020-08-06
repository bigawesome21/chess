import React from 'react';
import Chessboard from 'react-simple-chessboard';

class Board extends React.Component {
  render() { 
    return (
      <Chessboard 
        draggable={true}
        position={'start'}
        dropOffBoard={true} /> 
    );
  }
}

export default Board;
