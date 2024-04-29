import DBServer from "./DB-Server.json";
import DBUser from "./DB-User.json";

const GetAllItems = /*async*/ (userName) => {
  const user = userName;

  // descomentar cuando se ponga en uso la base de datos.

  // try {
  //   const res = await fetch(URL + userName ? `/Inventory/${user}`: null , {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (!res.ok) {
  //     throw Error("Error en la peticion del servidor", Error);
  //   }
  //   const data = await res.json();
  //   console.log("Data recivida: ", data);
  //   return data;

  // } catch (error) {
  //   console.log("Error en la peticion: ", error);
  // } 

  // borrar el codigo de abajo cuando se ponga en uso la base de datos 
  if (user) {
    return DBUser;
  } else {
    return DBServer;
  }
};

export default GetAllItems;