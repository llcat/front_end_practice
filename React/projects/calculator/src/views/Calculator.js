import React, {Component} from 'react'
import KeyBoard from '../components/KeyBoard';
import './Calculator.less'

class Calculator extends Component {
    render(){
        return (
            <div className='calculator'>
                <KeyBoard />
            </div>
        )
    }
}

export default Calculator;