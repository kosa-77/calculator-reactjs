import React from 'react'

const NegateButton = ({ onClick }) => {
  return (
    <button id='negateBtn' onClick={onClick}>-+</button>
  )
}

export default NegateButton