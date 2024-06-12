import React, { useState, useEffect } from "react";
import LinkItem from "./LinkItem";
import "./NavBar.css";

const NavBar = () => {
  const [login, setLogin] = useState(false);

  let userName = localStorage.getItem("userName"); //|| "Nituca41";
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

  const accountContent = () => {
    return (
      <div>
        <div className="content">
          <a href={"inventory"}>My Inventory</a>
        </div>
        <div>
          <p
            className="content"
            onClick={() => {
              localStorage.removeItem("userName");
              setLogin(false);
            }}
          >
            Sign off
          </p>
        </div>
      </div>
    );
  };

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <ul>
          <LinkItem key={"offermaker"} to={"/offermaker"}>
            Create Offer
          </LinkItem>
          <LinkItem className={"tittle"} key={"home"} to={"/"}>
            GameStore
          </LinkItem>
          {login ? (
            <div className="sign-in-log-in">
              <LinkItem key={"signIn"} to={"signin"}>
                Sign In
              </LinkItem>
              <LinkItem key={"user"} to={"/login"}>
                Login
              </LinkItem>
            </div>
          ) : (
            <LinkItem key={"account"} to={""} content={accountContent()}>
              {userName}
            </LinkItem>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
