import "./register.css";
import React, { useState } from "react";
import handleSubmit from "../../services/registerService";

function RegisterForm() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError("");
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match");
    } else {
      handleSubmit(newUser, setError);
    }
  };

  return (
    <div className="wrapper">
      <form>
        <h2>Register</h2>
        <div className="input-container">
          <div className="input-box">
            <input
              id="username"
              type="text"
              placeholder="User"
              value={newUser.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="input-box">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <div className="buttons-register">
          <button
            type="button"
            onClick={handleClickSubmit}
            className="register"
          >
            Register
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;
