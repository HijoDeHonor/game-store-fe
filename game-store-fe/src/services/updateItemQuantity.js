async function updateItemQuantity(UserName, item) {
  const updateData = {
    itemId: item.Id,
    quantityToRemove: item.quantity,
  };

  //PATCH /Inventory/{IdUsuario}
  const updateCollection = await fetch(URL + `/Inventory/${UserName}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const updatedInventory = await res.json();
      // Verificar si la cantidad restante es 0 y eliminar el elemento si es así
      const updatedItem = updatedInventory.find((item) => item.id === itemId);
      if (updatedItem && updatedItem.quantity === 0) {
        await removeItem(UserName, item);
      }
      return updatedInventory;
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      throw error;
    });
  return updateCollection;
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

export { updateItemQuantity, removeItem };
