import "./register.css";
import React, { useState } from "react";
import handleSubmit from "../../services/registerService";
import { ERROR_TRY_AGAIN, PASSWORD_DONT_MATCH } from '../../utils/textConstants.js';
import { useNavigate } from "react-router-dom";


function RegisterForm () {
  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError("");
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {

      if (newUser.password !== newUser.confirmPassword) {
        setError(PASSWORD_DONT_MATCH);
      } else {
        const res = await handleSubmit(newUser, setError);

        if (res.ok) {
          navigate("/login");
          window.location.reload();
        } else {
          setError(ERROR_TRY_AGAIN);
        }
      }
    } catch (error) {
      setError(ERROR_TRY_AGAIN);
    }
  };

  return (
    <div className="wrapper">
      <form>
        <h2>Register</h2>
        <div className="input-container">
          <div className="input-box">
            <input
              id="userName"
              type="text"
              placeholder="User"
              value={ newUser.userName }
              onChange={ handleChange }
              required
            />
          </div>
          <div className="input-box">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={ newUser.password }
              onChange={ handleChange }
              autoComplete="new-password"
              required
            />
          </div>
          <div className="input-box">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={ newUser.confirmPassword }
              onChange={ handleChange }
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <div className="buttons-register">
          <button
            type="button"
            onClick={ handleClickSubmit }
            className="register"
          >
            Register
          </button>
        </div>
        { error && <div className="error-message">{ error }</div> }
      </form>
    </div>
  );
};

export default RegisterForm;
