import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [login, setLogin] = useState(true);

  const checkUser = () => {
    if (localStorage.getItem("user") !== null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <nav className="nav">
      <ul className="ul">
        {login ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/inventory">Inventory</Link>
        )}
        {login ? (
          <Link to="/register">Register</Link>
        ) : (
          <Link to="/register">Inventory</Link>
        )}
        <Link to="/inventory">
          <h1 className="title">GameStore</h1>
        </Link>
        <Link to="/offers">Offers</Link>
        <Link to="/offermaker">Create Offer</Link>
      </ul>
    </nav>
  );
};

export default NavBar;
