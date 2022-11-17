import { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { logIn } from "../../utils/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const { getUser } = useOutletContext();

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const login = async () => {
    setLoginMessage("");

    const data = await logIn(formData);

    if (data.error || data.password) {
      setLoginMessage("Wrong username or password.");
    } else {
      window.localStorage.setItem("user", JSON.stringify(data));
      getUser();
      setLoginMessage("Login successful.");
      navigate("/", { replace: true });
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div className={classes.login}>
      {loginMessage && <p>{loginMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={formHandler}>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={inputChangeHandler}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
