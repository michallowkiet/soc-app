import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar({ user, logoutHandler }) {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navMenu}>
        <li>
          <NavLink className={classes.navLink} to="/">
            Home
          </NavLink>
        </li>
        {!user && (
          <>
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
          </>
        )}

        {user && (
          <li>
            <button onClick={logoutHandler} className={classes.navLink}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
