import React from 'react'
import './Key.less';
import {keyDefinition} from '../config/key.config'


const specialKey = (keyProps) => {
  const keyId = keyProps.id;

  if (keyId === keyDefinition.KEY_OP_POWER){
    return (<span>X<sup>y</sup></span>)
  }
  else return <span>{keyProps.text}</span>
}

export default function Key(props) {
  const keyProps = props.keyProps;
  const isIconKey = !!keyProps.img;
  return (
    <div className="key">
      {isIconKey?<img src={keyProps.img} alt="" />:null}
      {specialKey(keyProps)}
    </div>
  )

}

