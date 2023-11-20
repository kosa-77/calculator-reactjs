import { useState, useEffect } from 'react'
import { create, all } from 'mathjs'
import Keyboard from './components/Keyboard'
import './App.css'

const rgxpNum = RegExp(/[0-9]/)
const rgxpOp = RegExp(/\+|\/|\*|-|Enter|Backspace|,|\./)
const rgxpOpNoComma = RegExp(/[\+\/\*-]/)

const App = (e) => {
  const [expression, setExpression] = useState(0)

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
      if(e.key.match(rgxpNum) || e.key.match(rgxpOp)){
          if(e.key.match('F')){
            return
          }
          e.preventDefault()
      }
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
    if (e.match(rgxpOpNoComma) != null) {
      if (expression.length > 0) {
        if (expression[expression.length - 1].match(rgxpOpNoComma)) {
          let edit = expression.slice(0, expression.length - 1)
          setExpression(edit + e)
          return
        }
      }
    }

    if (expression == 0) {
      // 0 == '0.' returns true but different behaviour is needed for each
      if(expression === '0.') {
        setExpression(expression + e)
        return
      }
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
    if (expression.length > 0) {
      let arr = expression.split(rgxpOpNoComma)
      if (JSON.stringify(arr[arr.length - 1]).includes('.')) {
        return
      }
      if(JSON.stringify(expression).charAt(expression.length).match(rgxpOpNoComma)){
        setExpression(expression+0+e)
        return
      }
    }
    setExpression(expression + e)
  }

  function eraseLast() {
    let exp = ''
    if (typeof (expression) == 'number') {
      exp = JSON.stringify(expression)
    } else {
      exp = expression
    }

    let exp2 = exp.substring(0, exp.length - 1)
    setExpression(exp2)
  }

  function clear() {
    setExpression(0)
  }

  function negate() {
    let exp = handleEndingOperationSign()
    setExpression(math.evaluate(`-1 * ${exp}`))
  }

  function calculatePercentage() {
    let exp = handleEndingOperationSign()
    setExpression(math.evaluate(`${exp} * 0.01`))
  }

  function calculate() {
    let exp = handleEndingOperationSign()
    setExpression(math.evaluate(exp))
  }

  function handleEndingOperationSign() {
    let exp = expression
    if (typeof (expression) == 'number') {
      exp = JSON.stringify(expression)
    }
    if (expression.charAt(expression.length - 1).match(rgxpNum) == null) {
      exp = expression.slice(0, expression.length - 1)
    }
    return exp
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