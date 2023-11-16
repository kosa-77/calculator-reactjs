import React from 'react'

const DigitButton = ({ num, onClick}) => {
  return (
    <button className='digitBtn' onClick={onClick}>{num}</button>
  )
}

export default DigitButton 