import styles from "./styles/Home.module.css"
import { useState, useEffect } from 'react';
import getDroneData from "./api/getDroneData";
import Card from "./components/Card";
import xml2json from "./functions/xml2json";

const App = () => {
  const [droneData, setDroneData] = useState({});
  const [timer, setTimer] = useState(null);


  const updateData = () => {
    try {
      getDroneData().then(result => {
        const json = xml2json(result.data);
        console.log(json)
        setDroneData(json)
      });
    } catch (error) {
      console.log(error);
    }

    clearTimeout(timer);
    setTimer(setTimeout(updateData, 2000));
  }

  useEffect(() => {
    updateData();
  });


  const list = [
    {
      id: "1",
      pilotName: "Matti Meikäläinen",
      pilotEmail: "matti@gmail.com",
      pilotPhoneNumber: "+358441234567",
      closestDistance: 89,
      timestamp: new Date("2022-12-06T22:02:28.033Z")
    },
    {

      id: "2",
      pilotName: "Maija Mehiläinen",
      pilotPhoneNumber: "+358441234567",
      pilotEmail: "maija@gmail.com",
      closestDistance: 51,
      timestamp: new Date("2022-12-06T22:02:28.033Z")
    },
    {
      id: "3",
      pilotName: "Daavid Dronettaja",
      pilotPhoneNumber: "+358447654321",
      pilotEmail: "daavid@gmail.com",
      closestDistance: 53,
      timestamp: new Date("2022-12-06T22:04:52.141Z")
    },
    {
      id: "4",
      pilotName: "Kari Kuvaaja",
      pilotPhoneNumber: "+358441112223",
      pilotEmail: "kari@gmail.com",
      closestDistance: 10,
      timestamp: new Date("2022-12-06T22:04:52.141Z")
    },
  ]

  return (
    <div className={styles.container}>
      <header>
        <title>Project Birdnest</title>
        <meta name="description" content="Next.js web page made for Reaktor Trainee Assignment." />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Reaktor Trainee Assignment 2023
        </h1>

        <h2>
          Birdnest violations
          <br />
          <ul>
            {(droneData && droneData.length > 0) &&
              droneData.map((drone, index) => {
                return (
                  <span> {drone}</span>
                )
              })
            }
          </ul>
        </h2>

        <div className={styles.grid}>
          {list.map((violation, index) => <div key={index}><Card item={violation} /></div>)}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Developed by Johannes Mensalo &copy; 2022</p>
      </footer>
    </div>
  );
}

export default App;
