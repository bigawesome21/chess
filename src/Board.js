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
  static whitePawn = "P";
  static whiteKnight = "N";
  static whiteBishop = "B";
  static whiteRook = "R";
  static whiteQueen = "Q";
  static whiteKing ="K";
  static blackPawn = "p";
  static blackBishop = "b";
  static blackKnight = "n";
  static blackRook = "r";
  static blackQueen = "q";
  static blackKing = "k";
  //TODO: validate fen

  constructor(stringValue) {
    this.stringValue = stringValue;

    if (stringValue === 'start') {
      
      this.stringValue = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    }
  }

  chessPiecesForRow(row) {
    const piecesForRows = this.stringValue.split('/');
    let rowString = piecesForRows[row].split('');
    let normalize = [];
    var stringify = '';

    for (var i = 0; i < rowString.length; i++) {
      
      if (!this.hasNumber(rowString[i])) {
        
        normalize.push(rowString[i]);
      }
      else {
        
        for (var j = 0; j < rowString[i]; j++) {
          
          normalize.push('1');
        }
      }
    }

    for (var i = 0; i < normalize.length; i++){
      
      stringify += normalize[i];
    }

    return stringify;
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

  emptySpacesInRow(fenRow) { 
    var findNums = fenRow.split('');
    var emptySpaces = 0;
    
    for (var i = 0; i < findNums.length; i++) {
      
      if (isNaN(findNums[i])) {

        emptySpaces += 0;
      }
      else {
        
        emptySpaces += parseInt(findNums[i], 10);
      }
    }

    return emptySpaces;
  }

  capture(otherFEN) {
    var hasCapture = false;
    let differentRows = this.rowIndeciesWithDifferences(otherFEN);
    var diff1 = this.chessPiecesForRow(differentRows[0]);
    var otherDiff1 = otherFEN.chessPiecesForRow(differentRows[0]);
    var thisTotalEmpty = this.emptySpacesInRow(diff1);
    var otherTotalEmpty = otherFEN.emptySpacesInRow(otherDiff1);

    if (differentRows.length > 1) {

      var diff2 = this.chessPiecesForRow(differentRows[1]);
      var otherDiff2 = otherFEN.chessPiecesForRow(differentRows[1]);
      thisTotalEmpty += this.emptySpacesInRow(diff2);
      otherTotalEmpty += otherFEN.emptySpacesInRow(otherDiff2);
    }

    if (thisTotalEmpty === otherTotalEmpty) {
      
      return hasCapture;
    }
    else {
      
      hasCapture = true;
      return hasCapture;
    }
  }
  
  hasNumber(string) {
    return /\d/.test(string);
  }

  returnOnlyString(fenRow) {
    
    var fenSplit = fenRow.split('');
    let onlyString;
    var stringifyOnlyString

    for (var i = 0; i < fenSplit.length; i++) {
      
      if (this.hasNumber(fenSplit[i])) {

      }
      else {
        
        onlyString.push(fenSplit[i]);
      }
    }

    for (var i = 0; i < onlyString.length; i++) {
      
      stringifyOnlyString.concat(onlyString[i]);
    }

    return stringifyOnlyString;
  }
  
  countSpecificPieceInRow(chessPiece, rowWithOnlyPieces) {
    var numOfSpecificPiece = 0;
    let splitRowWithOnlyPieces = rowWithOnlyPieces.split('');

    for (var i; i < splitRowWithOnlyPieces.length; i++) {
      
      if (splitRowWithOnlyPieces[i] === chessPiece) {
        numOfSpecificPiece++;
      }
    }

    return numOfSpecificPiece;
  }

  numOfAllPiecesInRow(FENRow) {
    let allPiecesInRow = [];
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.whitePawn, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.whiteBishop, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.whiteKnight, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.whiteRook, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.whiteQueen, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.whiteKing, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.blackPawn, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.blackBishop, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.blackKnight, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.blackRook, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.blackQueen, FENRow));
    allPiecesInRow.push(this.countSpecificPieceInRow(FEN.blackKing, FENRow));

    return allPiecesInRow;
  }

  //TODO: Consider if only one difference & capture then finish up
  getPieceThatMoved(otherFEN) {
    
    let differentRows = this.rowIndeciesWithDifferences(otherFEN); 
    var diff1 = this.chessPiecesForRow(differentRows[0]);
    var diff2;
    var otherDiff1 = otherFEN.chessPiecesForRow(differentRows[0]);
    var otherDiff2;
    let numOfThisPieces1 = this.numOfAllPiecesInRow(diff1);
    let numOfThisPieces2;
    let numOfOtherPieces1 = otherFEN.numOfAllPiecesInRow(otherDiff1);
    let numOfOtherPieces2;  

    if (differentRows.length > 1) {
         
      diff2 = this.chessPiecesForRow(differentRows[1]);
      otherDiff2 = otherFEN.chessPiecesForRow(differentRows[1]);
      numOfThisPieces2 = this.numOfAllPiecesInRow(diff2);
      numOfOtherPieces2 = otherFEN.numOfAllPiecesInRow(otherDiff2); 
        
      var diffNumOfPiece = 0;

      for (var i = 0; i < numOfThisPieces1.length; i++) {
          
        if (numOfThisPieces1[i] !== numOfOtherPieces1[i] && numOfThisPieces2[i] !== numOfOtherPieces2[i]) {
            
          diffNumOfPiece = i;  
        }
      }

      switch (diffNumOfPiece) {
          
        case 0:
          return FEN.whitePawn;
        case 1:
          return FEN.whiteBishop;
        case 2:
          return FEN.whiteKnight;
        case 3: 
          return FEN.whiteRook;
        case 4:
          return FEN.whiteQueen;
        case 5:
          return FEN.whiteKing;
        case 6:
          return FEN.blackPawn;
        case 7:
          return FEN.blackBishop;
        case 8:
          return FEN.blackKnight;
        case 9:
          return FEN.blackRook;
        case 10:
          return FEN.blackQueen;
        case 11:
          return FEN.blackKing;
        default:
          return;
      }
    } else {
    
      let diffSplit = diff1.split('');
      let otherDiffSplit = otherDiff1.split('');

      for (var i = 0; i < diffSplit.length; i++) {
        
        if (diffSplit[i] !== otherDiffSplit[i] && !this.hasNumber(otherDiffSplit[i])) {
          
          break;
        }
      }
      
      return otherDiffSplit[i];
    }
  }

    getRow(otherFEN) {

      let differentRows = this.rowIndeciesWithDifferences(otherFEN); 
      var diff1 = this.chessPiecesForRow(differentRows[0]);
      var diff2;
      var otherDiff1 = otherFEN.chessPiecesForRow(differentRows[0]);
      var otherDiff2;
      let numOfThisPieces1 = this.numOfAllPiecesInRow(diff1);
      let numOfThisPieces2;
      let numOfOtherPieces1 = otherFEN.numOfAllPiecesInRow(otherDiff1);
      let numOfOtherPieces2;
    
      if (differentRows.length > 1) {
         
        diff2 = this.chessPiecesForRow(differentRows[1]);
        otherDiff2 = otherFEN.chessPiecesForRow(differentRows[1]);
        numOfThisPieces2 = this.numOfAllPiecesInRow(diff2);
        numOfOtherPieces2 = otherFEN.numOfAllPiecesInRow(otherDiff2); 

        for (var i = 0; i < numOfThisPieces1.length; i++) {
          
          if (numOfThisPieces1[i] < numOfOtherPieces1[i] && numOfThisPieces2[i] > numOfOtherPieces2[i]) {

            return 9-(differentRows[0]+1);
          }
          else if (numOfThisPieces1[i] > numOfOtherPieces1[i] && numOfThisPieces2 < numOfOtherPieces2[i]) {
            
            return 9-(differentRows[1]+1); 
          }
        }

      }

      return 9-(differentRows[0]+1);
    }

    getColumn(otherFEN) {
    
      var row = 8-this.getRow(otherFEN);
      var diff1 = this.chessPiecesForRow(row);
      var otherDiff1 = otherFEN.chessPiecesForRow(row);
      let diffSplit = diff1.split('');
      let otherDiffSplit = otherDiff1.split('');
      var column = 0;

      for (var i = 0; i < diffSplit.length; i++) {
        
        if (diffSplit[i] !== otherDiffSplit[i] && !this.hasNumber(otherDiffSplit[i])) {
          
          column = i+1;
        }
      }

      switch (column) {
        case 1:
          return 'a';
        case 2:
          return 'b';
        case 3:
          return 'c';
        case 4:
          return 'd';
        case 5:
          return 'e';
        case 6:
          return 'f';
        case 7:
          return 'g';
        case 8:
          return 'h';
        default:
          return;
     }

    }

    getMove(otherFEN) {
      
      return this.getPieceThatMoved(otherFEN);
      //+ this.getColumn(otherFEN) + this.getRow(otherFEN);
    }
}

const Board = props => {
    var [position, setPosition] = useState('start');
    
    const { move, history, fen, reset, undo, turn } = useChess({
      onLegalMove: moved => console.log(`Made move: ${moved}`),
      onIllegalMove: moved => console.log(`Illegal move: ${moved}`),
      onGameOver: () => console.log(`Game Over`)
    });
    
    const onChange = (newPos) => {
      
      const fen1 = new FEN(position);
      const fen2 = new FEN(newPos);
      const move = fen1.getMove(fen2);
      console.log(`Old position: ${position}`);
      console.log(`New position: ${newPos}`);
      console.log(`move: ${move}`);
      position = newPos;
      setPosition(newPos);
    };
    
    return (
        <div className="board">
            <Chessboard
              draggable={true}
              position={fen}
              onChange={onChange}
            />
            <p>Position: {position}</p>
            <button onClick={undo}>Undo</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Board;
