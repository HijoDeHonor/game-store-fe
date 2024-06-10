/**import React from 'react';
import { useHistory } from 'react-router-dom'; */
import './login.css'
function LoginForm() {
  /* const history = useHistory();

  const handleButtonClick = () => {
    // Redirige a la otra página
    history.push('/otra-pagina');
  }; */

  return (
    <div className="wrapper">
      <form action="">
        <h1>GAME STORE</h1>
        <div className='input-container'>
        <div className="input-box">
          <input type="text" id='user' placeholder="User" required />
        </div>

        <div className="input-box">
          <input type="password" id='password' placeholder="Password" required />
        </div>
        </div>
        <div className="buttons-login">
          <button className='login' type="submit">Log In</button>
          <button className='signin'/*onClick={handleButtonClick}*/>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
