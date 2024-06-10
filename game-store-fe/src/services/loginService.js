import users from "../utils/users.json";

const logInService = (User, setError) => {
  
  const data = users; 
  const userFound = data.find((u) => u.username === User.username && u.password === User.password);
  if (userFound) {
    localStorage.setItem("token", userFound.token);
    localStorage.setItem("username", userFound.username);
    setError("");
    return alert("Login exitoso");
  } else {

    return setError("Usuario o contraseña incorrectos");
  }

};

export default logInService;