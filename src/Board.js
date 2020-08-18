import React, { useState } from 'react';
import Chessboard from 'react-simple-chessboard';
import useChess from 'react-chess.js'

class Game {
  constructor() {
    this.turn = false;
  } 
};

class FEN {
  
  static numRows = 8;
  //TODO: validate fen
  constructor(stringValue) {
    this.stringValue = stringValue;
  }

  chessPiecesForRow(row) {
    const piecesForRows = this.stringValue.split('/');
    return piecesForRows[row];
  }

  rowIndeciesWithDifferences(otherFEN) {
    let rowIndecies = [];

    for (var rowIndex = 0; rowIndex < FEN.numRows; rowIndex++) {
      var fenRow = this.chessPiecesForRow(rowIndex);
      var otherFENRow = otherFEN.chessPiecesForRow(rowIndex);

      if (fenRow !== otherFENRow) {        
        rowIndecies.push(rowIndex);
      }
    }

    return rowIndecies;
  }
}

const Board = props => {
    const [position, setPosition] = useState('start');
    
    const { move, history, fen, reset, undo, turn } = useChess({
      onLegalMove: moved => console.log(`Made move: ${moved}`),
      onIllegalMove: moved => console.log(`Illegal move: ${moved}`),
      onGameOver: () => console.log(`Game Over`)
    });
    
    const onChange = (newPos) => {
      console.log(`New position: ${newPos}`);
      setPosition(newPos);
    };
    
    const FENtoSAN = (fenString1, fenString2) => {
      
      const fen1 = FEN(fenString1);
      const fen2 = FEN(fenString2);

      const rowsWithDifferences = fen1.rowIndiciesWithDifferences(fen2);
    }
  
    return (
        <div className="board">
            <Chessboard
              draggable={true}
              position={fen}
              onChange={onChange}
              FENtoSAN={FENtoSAN}
            />
            <p>Position: {position}</p>
            <button onClick={undo}>Undo</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Board;
