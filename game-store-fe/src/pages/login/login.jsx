import React from "react";
import { useState } from "react";
import logInService from "../../services/loginService";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { LOGIN_USER_PASS_ERROR, LOG_IN, SIGN_IN } from "../../utils/textConstants";
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
      console.log(res)
      if (res.ok) {
        navigate("/");
        window.location.reload();
      } else {
        setError(LOGIN_USER_PASS_ERROR);
      }
    } catch (err) {
      setError(LOGIN_USER_PASS_ERROR);
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>{LOG_IN}</h2>
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
            {LOG_IN}
          </button>
          <button className="signin" onClick={goToRegister}>
            {SIGN_IN}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
