import users from "../utils/users.json";

const logInService = (User, setError) => {
  
  const data = users; 
  const userFound = data.find((u) => u.userName === User.userName && u.password === User.password);
  if (userFound) {
    localStorage.setItem("token", userFound.token);
    localStorage.setItem("userName", userFound.userName);
    setError("");
    return alert("Login exitoso");
  } else {

    return setError("Usuario o contraseña incorrectos");
  }

};

export default logInService;