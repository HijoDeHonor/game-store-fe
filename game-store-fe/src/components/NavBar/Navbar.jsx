import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  return (
    <>
      <nav className="nav">
        <ul className="ul">
          <Link to="/login">Login</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/">
            <h1 className="title">GameStore</h1>
          </Link>
          <Link to="/offers">Offers</Link>
          <Link to="/offermaker">Create Offer</Link>
        </ul>
      </nav>
    </>
  );
};
export default NavBar;
