import users from "../utils/users.json";

const logInService = (User, setError) => {
  const data = users;
  const userFound = data.find(
    (u) => u.userName === User.userName && u.password === User.password
  );
  if (userFound) {
    localStorage.setItem("token", userFound.token);
    localStorage.setItem("userName", userFound.userName);
    console.log(userFound.token);
    setError("");
    return { ok: true, token: userFound.token, message: "Login successful" };
  } else {
    return setError("Usuario o contraseña incorrectos");
  }
};

export default logInService;