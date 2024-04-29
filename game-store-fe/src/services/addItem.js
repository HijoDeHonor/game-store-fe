async function addItem(UserName, offer, request, item) {
  let itemsToAdd = [];
  let items = offer || request || item;
  let userName = UserName || localStorage.getItem("UserName");

  // Verificar si item es un array y contiene al menos un elemento
  if (Array.isArray(item) && items.length > 0 && typeof item[0] === "object") {
    itemsToAdd = item;
  } else if (typeof item === "object") {
    // Si item es un solo objeto
    itemsToAdd.push(item);
  } else {
    throw new Error(
      'El parámetro "item" debe ser un objeto o un array de objetos.'
    );
  }

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

export default addItem;