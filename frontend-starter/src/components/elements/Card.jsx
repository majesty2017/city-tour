import React from 'react'

const Card = ({children, title}) => {
  return (
    <div className='card h-100'>
      <div className='card-header'>
        <h5>{title}</h5>
      </div>
      <div className='card-body'>
        {children}
      </div>
    </div>
  )
}
export default Card
