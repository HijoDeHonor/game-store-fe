import React from "react";
import { useState } from "react";
import logInService from "../../services/loginService";
import { useNavigate } from "react-router-dom";
import "./login.css";
function LoginForm() {
  const [error, setError] = useState("");

  const [User, setUser] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { id, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await logInService(User, setError);
      if (res.ok) {
        window.localStorage.setItem("GameStore-userName", res.userName)
        window.localStorage.setItem("GameStore-user-token", res.token)
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-container">
          <div className="input-box">
            <input
              type="text"
              placeholder="User"
              id="userName"
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
              autoComplete="current-password"
              required
            />
          </div>
        </div>
        <div className="buttons-login">
          <button className="login" type="submit">
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
