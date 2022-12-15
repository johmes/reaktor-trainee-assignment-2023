import axios from 'axios';
import { useEffect, useState } from 'react';
// TODO - delete this file
const useGetDroneData = () => {
  const [droneData, setDroneData] = useState(null);

  useEffect(() => {
    const fetch = () => {
      try {
        axios.get('/drones').then(result => {
          const data = result.data;
          console.log("Drone data.report.capture", data.report.capture)
          setDroneData(data.report.capture.drone);
        }).catch(error => {
          if (axios.isCancel(error)) {
            console.error("Request cancelled", error);
          } else {
            console.error(error);
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
    
  }, []);

  return droneData;
};

export default useGetDroneData;