import { useState, useEffect } from 'react'
import { create, all } from 'mathjs'
import Keyboard from './components/Keyboard'
import './App.css'

const rgxpNum = RegExp(/[0-9]/)
const rgxpOp = RegExp(/\+|\/|\*|-|Enter|Backspace|,|\./)

const App = (e) => {
  const [expression, setExpression] = useState(1)

  useEffect(() => {

    document.addEventListener('keydown', printSymbol)

    return () => {
      document.removeEventListener('keydown', printSymbol)
    }
  }, [printSymbol])

  const config = {}
  const math = create(all, config)


  if (expression === '') {
    setExpression(0)
  }

  function handleKeyboardInput(event) {

    const symbol = event.key

    if (symbol.match(rgxpNum) != null && (symbol.length == 1)) {
      printSymbol(symbol)
    } else if (symbol.match(rgxpOp) != null) {
      if (symbol.match(rgxpOp) == 'Enter') {
        calculate()
      } else if (symbol.match(rgxpOp) == 'Backspace') {
        eraseLast()
      } else {
        printSymbol(symbol)
      }
    }
  }

  function printSymbol(e) {
    if (e.key) {
      e.preventDefault()
      handleKeyboardInput(e)
      return
    }

    if (e == 'x') {
      e = '*'
    }

    if (e == ',') {
      e = '.'
    }

    // no consecutive operation signs, change operation sign instead of appending another one to the expression
    if (e.match(rgxpOp) != null) {
      if (expression.length > 0) {
        if (expression[expression.length - 1].match(rgxpOp)) {
          let edit = expression.slice(0, expression.length - 1)
          setExpression(edit + e)
          return
        }
      }
    }

    if (expression == 0) {
      if (e == '.') {
        handleDecimal(e)
      } else {
        if (e.match(rgxpOp) != null) {
          setExpression(expression + e)
        } else {
          setExpression(e)
        }
      }
    } else {
      if (e == '.') {
        handleDecimal(e)
        return
      }
      setExpression(expression + e);
    }
  }

  function handleDecimal(e) {
    const rgxpOpNoComma = RegExp(/[\+\/\*-]/)
    if (expression.length > 0) {
      let arr = expression.split(rgxpOpNoComma)
      if (JSON.stringify(arr[arr.length - 1]).includes('.')) {
        return
      }
    }
    setExpression(expression + e)
  }

  function eraseLast() {
    if (typeof (expression) == 'number') {
      setExpression(JSON.stringify(expression))
    }
    setExpression(expression.substr(0, expression.length - 1))
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
            <output id='outputDiv'>{expression}</output>
          </form>
          <Keyboard
          printSymbol={printSymbol}
          eraseLast={eraseLast}
          clear={clear}
          negate={negate}
          calculatePercentage={calculatePercentage}
          calculate={calculate}
          ></Keyboard>
        </div>
      </section>
    </>
  )
}

export default App