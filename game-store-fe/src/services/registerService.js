import users from "../assets/utils/users.json";
const checkUsernameExists = /*async*/ (newUsername) => {
  //   try {
  //   const response = await fetch(`/api/users/${newUsername}`);
  //   const data = await response.json();
  //   if (response.status === 404) {
  //     return false; // El nombre de usuario no existe
  //   } else if (response.ok) {
  //     return true; // El nombre de usuario ya existe
  //   } else {
  //     throw new Error("Error al verificar el nombre de usuario: " + data.error);
  //   }
  //   } catch (error) {
  //   console.error("Error al verificar el nombre de usuario:", error);
  //   return true;
  const exists = users.find((user) => user.username === newUsername);
  if (exists) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = /*async*/ ( newUser, setError) => {
    // event.preventDefault();
    // const exists = checkUsernameExists(newUser.username);
    // if (exists) {
    //     setError("Nombre de usuario no disponible");
    //     return;
    // }
    // if (newUser.password !== newUser.confirmPassword) {
    //     setError("Las contraseñas no coinciden.");
    //     return;
    // }
    // {
    //     try {
    //         const res = await fetch('/api/users', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newUser)
    //         });
    //         if (!res.ok) {
    //             throw new Error('Error al registrar usuario');
    //         }{
    //         const data = await res.json();
    //         console.log(data);
    //         alert("Registro exitoso");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError("Error al registrar usuario");
    //     }
    // }
    const exists = checkUsernameExists(newUser.username);
    if (exists) {
        setError("Nombre de usuario no disponible");
        return;
    }
    if (newUser.password !== newUser.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return; 
    }
    alert("Registro exitoso, Bienvenido a Game Store");
};

export default handleSubmit;