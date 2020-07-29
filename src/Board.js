import React from 'react';
import { useParams } from 'react-router-dom';
import Chessboard from './@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    var board1 = Chessboard('board1', 'start');
    return (
      <div id="board1" style="width: 400px" />
    );
  }
}

export default Board;
