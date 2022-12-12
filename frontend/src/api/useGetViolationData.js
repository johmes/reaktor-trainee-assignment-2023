import axios from "axios";
import { useEffect, useState } from "react";

const useGetViolationData = () => {
  const [violationData, setViolationData] = useState([]);
  useEffect(() => {
    const fetch = () => {
      try {
        axios.get('/api/violations')
          .then(result => {
            const data = result.data;
            setViolationData(data);
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

  return violationData
}

export default useGetViolationData