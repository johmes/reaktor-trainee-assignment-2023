import React from 'react'
import styles from "../styles/Home.module.css"
import Card from "./Card";

const Home = (props) => {
  return (
    <div className={styles.container}>
      <header>
        <title>Project Birdnest</title>
        <meta name="description" content="React web app made for Reaktor Trainee Assignment." />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Birdnest is under attack!
        </h1>

        <h2>Here are the pilots disturbing the peace of the nest</h2>

        <div className={styles.grid}>
          {(props.violations && props.violations.length > 0)
            &&
            props.violations.map((violation, index) => (
              <div key={index}>
                <Card item={violation} />
              </div>
            ))
          }
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>Developed by Johannes Mensalo &copy; 2022</p>
      </footer>
    </div>
  )
}

export default Home