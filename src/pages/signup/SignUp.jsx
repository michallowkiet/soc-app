import classes from "./SignUp.module.css";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({});

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const login = async () => {
    const response = await axios.post(
      "http://akademia108.pl/api/social-app/user/login",
      formData
    );

    const data = response.data;

    if (data.error) {
      throw new Error("Lipa");
    }

    window.localStorage.setItem("user", JSON.stringify(data));
  };

  const formHandler = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div className={classes.signUp}>
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
