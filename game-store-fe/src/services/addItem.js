async function addItem(UserName, offer, request, item) {
  let itemsToAdd = [];
  let items = offer || request || item;
  let userName = UserName || localStorage.getItem("UserName");

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

export default addItem;
