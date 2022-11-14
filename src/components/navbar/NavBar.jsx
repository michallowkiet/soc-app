import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navMenu}>
        <li>
          <NavLink className={classes.navLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={classes.navLink}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" className={classes.navLink}>
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
