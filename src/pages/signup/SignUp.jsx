import classes from "./SignUp.module.css";
import { useState } from "react";
import { signUp } from "../../utils/api";
import * as validator from "../../utils/validation";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [signUpDone, setSignUpDone] = useState(false);
  const [isErrors, setIsErrors] = useState(true);

  let errorEl;

  const signup = async () => {
    setSignUpDone(false);

    const responseData = await signUp(formData);

    if (responseData.error) {
      return (errorEl = <p>{responseData.error}</p>);
    }

    if (responseData.signedup) {
      setFormData((prevState) => {
        return {
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        };
      });
      document.getElementById("myForm").reset();
      document.getElementById("signup").setAttribute("disabled", true);
      setSignUpDone(true);
    }
  };

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: target.value,
      };
    });
  };

  const validate = () => {
    const { username, email, password, repeatPassword } = formData;
    let validationError = {
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
    };

    validationError.username =
      validator.isEmpty(username) ||
      !validator.isMoreThen(username, 4) ||
      !validator.isEmptySpace(username);

    validationError.email =
      validator.isEmpty(email) ||
      !validator.isEmptySpace(email) ||
      !validator.isEmail(email);

    validationError.password =
      validator.isEmpty(password) ||
      !validator.isMoreThen(password, 6) ||
      !validator.isDigit(password) ||
      !validator.isSpecialCharacter(password);

    validationError.repeatPassword = password !== repeatPassword;

    setErrors((prevState) => {
      return {
        ...prevState,
        username: validationError.username ? validator.invalidUsername() : "",
        email: validationError.email ? validator.invalidEmail() : "",
        password: validationError.password ? validator.invalidPassword() : "",
        repeatPassword: validationError.repeatPassword
          ? validator.invalidRepeatPassword()
          : "",
      };
    });
  };

  const formHandler = (event) => {
    event.preventDefault();
    validate();

    const isError = Object.values(errors).some((val) => val !== "");

    setIsErrors(() => {
      return isError;
    });

    if (!isError) {
      signup();
    }
  };

  return (
    <div className={classes.signUp}>
      <h2>Sign Up</h2>
      {errorEl}
      <form id="myForm" onSubmit={formHandler}>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={inputChangeHandler}
          />
          <p className={classes.error}>{errors.username}</p>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={inputChangeHandler}
          />
          <p className={classes.error}>{errors.email}</p>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={inputChangeHandler}
          />
          <p className={classes.error}>{errors.password}</p>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="re-password">Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            id="re-password"
            onChange={inputChangeHandler}
          />
          <p className={classes.error}>{errors.repeatPassword}</p>
        </div>

        <button id="signup" type="submit">
          Sign Up
        </button>
      </form>
      {!isErrors && signUpDone && (
        <Link className={classes.btn} to="/login">
          Login
        </Link>
      )}
    </div>
  );
}

export default SignUp;
