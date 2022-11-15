import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";

function App() {
  const [user, setUser] = useState({});

  const getDataLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem("user")) ?? {};
    setUser(storage);
  };

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "");

  axios.defaults.headers.post["Content-Type"] = "application/json";
  return (
    <div className="App">
      <NavBar />
      <Outlet context={[user, getDataLocalStorage]} />
    </div>
  );
}

export default App;
