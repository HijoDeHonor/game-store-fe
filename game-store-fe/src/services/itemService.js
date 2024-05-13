import DBServer from "../utils/DB-Server.json";
import DBUser from "../utils/DB-User.json";

async function addItem(UserName, offer, request, item) {
  let itemsToAdd = [];// this is the array that will be sent to the backend
  let items = offer || request || item; // base on the parameters recieved in the function (offer, request or item) determines which items will be added
  let userName = UserName || localStorage.getItem("UserName"); // base the existence of the userName in the parameter determines which user will add the items

  //add the items to the array to be send to the backend
  items.forEach((item) => {
    itemsToAdd.push({ item });
  });

  //POST/Inventory/{IdUsuario}
  const addToCollection = await fetch(URL + `/Inventory/${userName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemsToAdd),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      throw error;
    });
    
  return addToCollection;
}


async function removeItem(UserName, item) {
  const itemId = item.Id;
  //DELETE /Inventory/{IdUsuario}
  const removeFromCollection = await fetch(
    URL + `/Inventory/${UserName}/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      throw error;
    });

  return removeFromCollection;
}




const GetAllItems = (userName) => {
  const user = userName;
  if (user) {
    return DBUser;
  } else {
    return DBServer;
  }
};

export { removeItem, addItem, GetAllItems };
