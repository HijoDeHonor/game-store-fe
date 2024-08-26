import './register.css';
import { useState } from 'react';
import handleSubmit from '../../services/registerService';
import { ERROR_TRY_AGAIN, LOGIN, PASSWORD_DONT_MATCH, SUCCESSFULL_SIGNIN } from '../../utils/textConstants.js';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from '../../utils/snackbars.jsx';
import LoadingSpinner from '../../components/Spinner.jsx';

function RegisterForm () {

  const { success, error } = useSnackbarContext();
  const [show, setShow] = useState(false);
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
    setShow(true);
    try {
      if (newUser.password !== newUser.confirmPassword) {
        throw new Error(PASSWORD_DONT_MATCH);
      }

      const res = await handleSubmit(newUser);

      if (res.ok) {
        success(SUCCESSFULL_SIGNIN);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShow(false);
        navigate(LOGIN);
      } else {
        throw new Error(ERROR_TRY_AGAIN);
      }

    } catch (err) {
      setShow(false);
      if (err.message === PASSWORD_DONT_MATCH) {
        error(PASSWORD_DONT_MATCH);
      } else {
        error(ERROR_TRY_AGAIN);
      }
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
      {show ? <div className="transparent-div"> <LoadingSpinner /> </div> : null}
    </div>
  );
}
export default RegisterForm;
