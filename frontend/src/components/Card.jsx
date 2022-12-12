import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from "../styles/Home.module.css"

const Card = (props) => {
  const { item } = props
  const [timeAgo, setTimeAgo] = useState()

  useEffect(() => {
    const seconds = Math.floor((new Date() - new Date(item.timestamp * 1000)) / 1000)
    const interval = Math.floor(((seconds / 60) / 60) * 60)
    setTimeAgo(interval)
  }, [setTimeAgo, item.timestamp])

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{item.pilotName}</h2>
        <p className={styles.secondaryText}>{timeAgo} min ago</p>
      </div>
      <p>Phone number: {item.pilotPhoneNumber}</p>
      <p>Email address: {item.pilotEmail}</p>
      <p>Closest to nest: {item.closestDistance} m</p>
    </div>
  )
}

export default Card