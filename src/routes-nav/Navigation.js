import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  // Display this if user logged in
  function loggedInNav() {
    return (
        <ul className="navbar-nav">
          <li className="nav-item mr-auto">
            <NavLink className="nav-link" to="/books">
              Books
            </NavLink>
          </li>

          <li className="nav-item mr-auto">
            <NavLink className="nav-link" to="/favBooks">
              My books
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" id="Navigation-logout" to="/" onClick={logout}>
              Log out {currentUser.firstName.toUpperCase() || currentUser.username.toUpperCase()}
            </Link>
          </li>
        </ul>
    );
  }

  // Display this if user not logged in
  function loggedOutNav() {
    return (
        <ul className="Navigation-login-signup navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
    <div className="Navigation">
      <nav className="Navigation-nav navbar navbar-expand-md">
        <Link className="navbar-brand text-dark" to="/">
          Book
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
    </div>
  );
}

export default Navigation;
