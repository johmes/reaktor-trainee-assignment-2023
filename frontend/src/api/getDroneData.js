import axios from 'axios';

const getDroneData = () => {
  return axios.get('/drones');
};

export default getDroneData;