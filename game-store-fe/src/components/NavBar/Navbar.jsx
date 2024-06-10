import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [login, setLogin] = useState(true);
  const [show, setShow] = useState(false);

  let userName = localStorage.getItem("userName") //|| "Admin41";

  const checkUser = () => {
    if (userName !== null) {
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
        <Link  className="nav-offermaker" to="/offermaker">Create Offer</Link>
        <Link className="tittle" to="/offers">
          <h1 className="tittle">GameStore</h1>
        </Link>
        {login ? (
          <Link className="nav-login" to="/login">Login</Link>
        ) : (
          <div
            onMouseLeave={() => setShow(false)}
            className={show ? "user-menu-hover" : "user-menu"}
          >
            <p onMouseEnter={() => setShow(true)}>{userName}▼</p>
            {show && (
              <div className={show ? "drop-user-menu-hover" : "drop-user-menu"}>
                <Link to="/inventory">My inventory ◄</Link>
                <p>Cerrar Sesión ◄</p>
              </div>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
