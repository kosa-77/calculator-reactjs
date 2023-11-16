import React from 'react'
import ClearButton from './buttons/ClearButton'
import EraseButton from './buttons/EraseButton'
import PercentageButton from './buttons/PercentageButton'
import DivideButton from './buttons/DivideButton'
import MultiplicationButton from './buttons/MultiplicationButton'
import DigitButton from './buttons/DigitButton'
import MinusButton from './buttons/MinusButton'
import PlusButton from './buttons/PlusButton'
import NegateButton from './buttons/NegateButton'
import DecimalPointButton from './buttons/DecimalPointButton'
import ResultButton from './buttons/ResultButton'
import '../index.css'

const Keyboard = ({
    printSymbol,
    eraseLast,
    clear,
    negate,
    calculatePercentage,
    calculate 
    }) => {
        
  return (
      <div>
      <div id='buttonRow'></div>
            <ClearButton onClick={() => clear()}></ClearButton>
            <EraseButton onClick={() => eraseLast()}></EraseButton>
            <PercentageButton onClick={() => calculatePercentage()}>%</PercentageButton>
            <DivideButton onClick={e => printSymbol(e.target.innerText)}>/</DivideButton>
          <div id='buttonRow'>
            <DigitButton num={7} onClick={e => printSymbol(e.target.innerText)}>7</DigitButton>
            <DigitButton num={8} onClick={e => printSymbol(e.target.innerText)}>8</DigitButton>
            <DigitButton num={9} onClick={e => printSymbol(e.target.innerText)}>9</DigitButton>
            <MultiplicationButton onClick={e => printSymbol(e.target.innerText)}>x</MultiplicationButton>
          </div>
          <div id='buttonRow'>
            <DigitButton num={4} onClick={e => printSymbol(e.target.innerText)}>4</DigitButton>
            <DigitButton num={5} onClick={e => printSymbol(e.target.innerText)}>5</DigitButton>
            <DigitButton num={6} onClick={e => printSymbol(e.target.innerText)}>6</DigitButton>
            <MinusButton onClick={e => printSymbol(e.target.innerText)}>-</MinusButton>
          </div>
          <div id='buttonRow'>
            <DigitButton num={1} onClick={e => printSymbol(e.target.innerText)}>1</DigitButton>
            <DigitButton num={2} onClick={e => printSymbol(e.target.innerText)}>2</DigitButton>
            <DigitButton num={3} onClick={e => printSymbol(e.target.innerText)}>3</DigitButton>
            <PlusButton onClick={e => printSymbol(e.target.innerText)}>+</PlusButton>
          </div>
          <div id='buttonRow'>
            <NegateButton onClick={() => negate()}>-+</NegateButton>
            <DigitButton num={0} onClick={e => printSymbol(e.target.innerText)}>0</DigitButton>
            <DecimalPointButton onClick={e => printSymbol(e.target.innerText)}>.</DecimalPointButton>
            <ResultButton onClick={() => calculate()}>=</ResultButton>
          </div>
      </div>
  )
}

export default Keyboard