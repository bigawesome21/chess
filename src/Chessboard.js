import React from 'react';
import { useParams } from 'react-router-dom';

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div>Chessboard</div>
    );
  }
}

export default Chessboard;
