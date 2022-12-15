import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import getMinutesAgo from '../functions/getMinutesAgo'
import styles from "../styles/Home.module.css"

const Card = (props) => {
  const { item } = props
  const [timeAgo, setTimeAgo] = useState()

  // TODO: clean useEffect 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getMinutesAgo(item.timestamp))
    }, 2000)
    return () => clearInterval(interval)
  }, [setTimeAgo, timeAgo, item.timestamp])


  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{item.pilotName}</h2>
        <p className={styles.secondaryText}>{timeAgo}</p>
      </div>
      <p>Phone number: {item.pilotPhoneNumber}</p>
      <p>Email address: {item.pilotEmail}</p>
      <p>Closest to nest: {item.closestDistance} m</p>
    </div>
  )
}

export default Card