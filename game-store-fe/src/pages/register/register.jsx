import './register.css';
import { useState } from 'react';
import handleSubmit from '../../services/registerService';
import { ERROR_TRY_AGAIN, LOGIN, PASSWORD_DONT_MATCH, SUCCESSFULL_SIGNIN } from '../../utils/textConstants.js';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from '../../utils/snackbars.jsx';

function RegisterForm () {

  const { success, error } = useSnackbarContext();

  const [newUser, setNewUser] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newUser.password !== newUser.confirmPassword) {
        throw new Error(PASSWORD_DONT_MATCH);
      }

      const res = await handleSubmit(newUser);

      if (res.ok) {
        success(SUCCESSFULL_SIGNIN);
        navigate(LOGIN);
        window.location.reload();
      } else {
        throw new Error(ERROR_TRY_AGAIN);
      }

    } catch (err) {
      error(err.message);
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
      </form>
    </div>
  );
}
export default RegisterForm;
