import { useState } from 'react'
import { create, all } from 'mathjs'
import './App.css'

function App() {
  const [expression, setExpression] = useState(0)
  
  const config = {}
  const math = create(all, config)

  if(expression === '') {
    setExpression(0)
  }

  function printSymbol(e) {
    if(e === 'x') {
      e = '*'
    }
    
    if(expression === 0) {
      if(e === '.') {
        handleDecimal(e)
      } else {
        setExpression(e)
      }
    } else {
      if(e === '.') {
        handleDecimal(e)
        return
      }
      setExpression(expression + e);
    }
  }

  function handleDecimal(e) {
    if(JSON.stringify(expression).includes('.')) {
      return
    }
    setExpression(expression + e)
  }

  function eraseLast() {
    if(typeof(expression) === 'number') {
      setExpression(JSON.stringify(expression))
    }
    setExpression(expression.substr(0, expression.length-1))
  }

  function clear() {
    setExpression(0)
  }

  function negate() {
    setExpression(math.evaluate(`-1 * ${expression}`))
  }

  function calculatePercentage() {
    setExpression(math.evaluate(`${expression} * 0.01`))
  }

  function calculate() {
    setExpression(math.evaluate(expression))
  }

  return (
    <>
    <section>
      <div>
        <form>
            <output>{expression}</output>
        </form>
      <div id='buttonRow'></div>
        <button id='clearBtn' onClick={() => clear()}>C</button>
        <button id='eraseBtn' onClick={() => eraseLast()}>c</button>
        <button id='percentageBtn' onClick={() => calculatePercentage()}>%</button>
        <button id='divideBtn' onClick={(e) => printSymbol(e.target.innerText)}>/</button>
      <div id='buttonRow'>
        <button onClick={e => printSymbol(e.target.innerText)}>7</button>
        <button onClick={e => printSymbol(e.target.innerText)}>8</button>
        <button onClick={e => printSymbol(e.target.innerText)}>9</button>
        <button onClick={e => printSymbol(e.target.innerText)}>x</button>
      </div>
      <div id='buttonRow'>
        <button onClick={e => printSymbol(e.target.innerText)}>4</button>
        <button onClick={e => printSymbol(e.target.innerText)}>5</button>
        <button onClick={e => printSymbol(e.target.innerText)}>6</button>
        <button onClick={e => printSymbol(e.target.innerText)}>-</button>
      </div>
      <div id='buttonRow'>
        <button onClick={e => printSymbol(e.target.innerText)}>1</button>
        <button onClick={e => printSymbol(e.target.innerText)}>2</button>
        <button onClick={e => printSymbol(e.target.innerText)}>3</button>
        <button onClick={e => printSymbol(e.target.innerText)}>+</button>
      </div>
      <div id='buttonRow'>
        <button id='negateBtn' onClick={() => negate()}>-+</button>
        <button onClick={e => printSymbol(e.target.innerText)}>0</button>
        <button id='decimalPointBtn' onClick={e => printSymbol(e.target.innerText)}>.</button>
        <button id='resultBtn' onClick={() => calculate()}>=</button>
      </div>
      </div>
    </section>
    </>
  )
}

export default App