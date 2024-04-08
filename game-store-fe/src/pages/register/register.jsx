import "./register.css";
import React, { useState } from "react";

function RegisterForm() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const checkUsernameExists = async (newUsername) => {
    try {
      const response = await fetch(`/api/users/${newUsername}`);
      const data = await response.json();

      if (response.status === 404) {
        return false; // El nombre de usuario no existe
      } else if (response.ok) {
        return true; // El nombre de usuario ya existe
      } else {
        throw new Error(
          "Error al verificar el nombre de usuario: " + data.error
        );
      }
    } catch (error) {
      console.error("Error al verificar el nombre de usuario:", error);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exists = await checkUsernameExists(newUser.username);
    if (exists) {
      setError("Nombre de usuario no disponible");
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    //post del neuvo ususario
    alert("Registro exitoso");
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError("");
  };

  return (
    <div className="wrapper">
      <form>
        <h1>GAME STORE</h1>
        <h2>Register</h2>
        <div className="input-container">
          <div className="input-box">
            <input
              id="newusername"
              type="text"
              placeholder="User"
              value={newUser.username}
              onChange={handleChange}
              required
            />            
          </div>
          <div className="input-box">
            <input
              id="newpassword"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
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
              required
            />
          </div>
        </div>
        <div className="buttons-register">
          <button onClick={handleSubmit} className="register">
            Register
          </button>
        </div>
        {error && (
              <div className="error-message">
                {error}
              </div>
            )}
      </form>
    </div>
  );
}

export default RegisterForm;