import axios from "axios";
import { useEffect, useState } from "react";

const useGetViolationData = () => {
  const [violationData, setViolationData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/api/violations')
        .then(result => {
          const data = result.data;
          setViolationData(data);
        }).catch(error => {
          console.error(error);
        })
    }, 2000)
    return () => clearInterval(interval)
  }, [violationData, setViolationData])

  return violationData
}

export default useGetViolationData