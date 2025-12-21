import React from 'react'
import styles from './Card.module.scss'

// Card component
const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>
}

export default Card
