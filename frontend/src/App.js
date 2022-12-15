import Home from "./components/Home.jsx";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([])

  const sockets = () => {
    const socket = io();
    socket.on("connect", () => {
      console.log("Client: " + socket.id);
      socket.emit("ready");

      socket.on("violationData", (data) => {
        console.log("Recieved ", data);
        setData(data);
      });
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  useEffect(() => {
    sockets()
  }, [])


  return (<Home violations={data} />);
}

export default App;
