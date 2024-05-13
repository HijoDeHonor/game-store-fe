import users from "../assets/utils/users.json";
const checkUsernameExists =(newUsername) => {
  const exists = users.find((user) => user.username === newUsername);
  if (exists) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = ( newUser, setError) => {
    newUser.token = "token user" + (users.length + 1);
    const exists = checkUsernameExists(newUser.username);
    if (exists) {
        setError("Nombre de usuario no disponible");
        return;
    }
    if (newUser.password !== newUser.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return; 
    }
    users.push(newUser);
    alert("Registro exitoso, Bienvenido a Game Store");
};

export default handleSubmit;