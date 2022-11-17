import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    const storage = JSON.parse(localStorage.getItem("user")) ?? null;
    setUser(storage);
  };

  const logoutHandler = async () => {
    try {
      await axios.post("http://akademia108.pl/api/social-app/user/logout");

      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "");

  axios.defaults.headers.post["Content-Type"] = "application/json";
  return (
    <div className="App">
      <NavBar user={user} logoutHandler={logoutHandler} />
      <Outlet context={{ user, getUser }} />
    </div>
  );
}

export default App;
