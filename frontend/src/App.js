import Home from "./components/Home.jsx";
import { io } from "socket.io-client";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState([])
  const socket = io();

  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("ready");
  });

  socket.on("violationData", (data) => {
    console.log("Recieved ", data.data);
    setData(data);
  });

  return (<Home violations={data} />);
}

export default App;
