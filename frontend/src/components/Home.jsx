import React from 'react'
import styles from "../styles/Home.module.css"
import Card from "./Card";
// import useGetViolationData from "../api/useGetViolationData";

const Home = (props) => {
  // const violations = useGetViolationData()

  return (
    <div className={styles.container}>
      <header>
        <title>Project Birdnest</title>
        <meta name="description" content="React web app made for Reaktor Trainee Assignment." />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Reaktor Trainee Assignment 2023
        </h1>

        <h2>Latest observations near birdnest</h2>

        <div className={styles.grid}>
          {(props.violations && props.violations.length > 0)
            &&
            props.violations.map((violation, index) => (
              <div key={index}><Card item={violation} /></div>
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