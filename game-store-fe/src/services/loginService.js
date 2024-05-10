import users from "../assets/utils/users.json";

const logInService = /*async*/ (User, setError) => {
  // try {
  //   const res = await fetch(`/api/users/${User.username}`);
  //   const data = await res.json();
  const data = users; // change this line for the line above
  const userFound = data.find((u) => u.username === User.username && u.password === User.password);
  if (userFound) {
    localStorage.setItem("token", userFound.token);
    localStorage.setItem("username", userFound.username);
    return alert("Login exitoso");
  } else {

    return setError("Usuario o contraseña incorrectos");
  }
  // } catch (error) {
  //   console.error(error);
  //   setError("Error al iniciar sesión");
  // }
};

export default logInService;