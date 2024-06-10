import React from "react";
import { useState } from "react";
import logInService from "../../services/loginService";
//import { useHistory } from 'react-router-dom';
import "./login.css";
function LoginForm() {
  const [error, setError] = useState("");

  const [User, setUser] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { id, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const goToRegister = () => {
    //history.push("/register");
  };

  return (
    <div className="wrapper">
      <form action="">
        <h1>GAME STORE</h1>
        <h2>Login</h2>
        <div className="input-container">
          <div className="input-box">
            <input
              type="text"
              placeholder="User"
              id="username"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="buttons-login">
          <button
            className="login"
            onClick={ () => logInService(User, setError)}
            type="button"
          >
            Log In
          </button>
          <button className="signin" onClick={goToRegister}>
            Sign In
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
