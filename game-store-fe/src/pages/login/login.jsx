import { useState } from 'react';
import logInService from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { LOGIN_USER_PASS_ERROR, LOG_IN, SIGNIN, SIGN_IN, SUCCESSFULL_LOGIN } from '../../utils/textConstants';
import { useSnackbarContext } from '../../utils/snackbars';
function LoginForm () {

  const { success, error } = useSnackbarContext();

  const [user, setUser] = useState({
    userName: '',
    password: '',
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

    try {
      const res = await logInService(user);
      if (res.ok) {
        success(SUCCESSFULL_LOGIN);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/');
        window.location.reload();
      } else {
        throw Error(LOGIN_USER_PASS_ERROR);
      }
    } catch (err) {
      error(err);
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate(SIGNIN);
  };

  return (
    <div className="wrapper-loggin">
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
      </form>
    </div>
  );
}

export default LoginForm;
