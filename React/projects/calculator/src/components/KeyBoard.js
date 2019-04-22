import React from 'react';
import Key from './Key';
import {
  basicKeyboard, 
  advancedKeyboard, 
  keyDefinition
} from '../config/key.config';

import './KeyBoard.less';

const generateKeyBoard = (config) => {
  const keyBoard = config.map((row, index) => (
      <div key={`row-${index}`} className="key-board-row">
        { row.map(key => <Key key={key.id} keyProps={key}/>) }
      </div>
    ));
  return keyBoard;
}

export default function KeyBoard(props) {
  return (
    <div className="key-board">
      {generateKeyBoard(advancedKeyboard)}
    </div>
  )
}
