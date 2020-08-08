import React from 'react';
import Chessboard from 'react-simple-chessboard';
import useChess from 'react-chess.js';

class Board extends React.Component {
  render() { 
    return (
      <Chessboard 
        draggable={true}
        position={'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'        }
        dropOffBoard={true} 
        onDragStart={'onDragStart'}
        onDrop={'onDrop'}
        onSnapEnd={'onSnapEnd'} /> 
    );
  }
}

export default Board;
