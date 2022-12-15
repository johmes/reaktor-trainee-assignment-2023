import axios from "axios";
import { useEffect, useState } from "react";
// TODO - delete this file
const useGetPilotData = (serialNumber) => {
  const [pilotData, setPilotData] = useState({});

  useEffect(() => {
    const fetch = () => {
      try {
        axios.get(
          '/api/pilots/:serialNumber',
          { params: { serialNumber: serialNumber } }
        )
          .then(result => {
            const data = result.data;
            setPilotData(data);
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

  }, [serialNumber]);

  return pilotData;
}

export default useGetPilotData;