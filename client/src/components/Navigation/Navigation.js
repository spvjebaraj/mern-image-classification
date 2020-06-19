import React from "react";
import "./Navigation.css";

const Navigation = ({ isAuthenticated, userToken, onRouteChange }) => {
  if (isAuthenticated && userToken !== null) {
    return (
      <nav className="navbar">
        <p className="nav-text">IMAGE CLASSIFICATION</p>
        <ul className="nav-links">
          <li className="nav-item">
            <p onClick={() => onRouteChange("signout")}>SignOut</p>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <p className="nav-text">IMAGE CLASSIFICATION</p>
        <ul className="nav-links">
          <li className="nav-item">
            <p onClick={() => onRouteChange("signin")}>SignIn</p>
          </li>
          <li className="nav-item">
            <p onClick={() => onRouteChange("signup")}>SignUp</p>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navigation;
