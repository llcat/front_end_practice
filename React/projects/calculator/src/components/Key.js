import React from 'react'
import './Key.less';
import {keyDefinition} from '../config/key.config'

const genKey = (keyProps) => {
  const keyId = keyProps.id;
  const keyClass = keyProps.className?`key ${keyProps.className}`:"key";
  const isIconKey = !!keyProps.img;
  let iconKey, textKey = null;
  if(isIconKey){
    iconKey = <img src={keyProps.img} alt=""/>
  }else{
    if (keyId === keyDefinition.KEY_OP_POWER){
      textKey = (<span>X<sup>y</sup></span>)
    }else {
      textKey = <span>{keyProps.text}</span>
    }
  }
  return (
    <div className={`${keyClass}`}>
      {iconKey}
      {textKey}
    </div>
  )
}
export default function Key(props) {
  const keyProps = props.keyProps;
  return genKey(keyProps)
}

