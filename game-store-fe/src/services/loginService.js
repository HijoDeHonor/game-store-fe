import users from "../utils/users.json";

const logInService = (User, setError) => {
  const data = users;
  const userFound = data.find(
    (u) => u.userName === User.userName && u.password === User.password
  );
  if (userFound) {
    setError("");
    return {
      ok: true,
      userName: userFound.userName,
      token: userFound.token,
      message: "Login successful",
    };
  } else {
    return setError("Usuario o contraseña incorrectos");
  }
};

export default logInService;
