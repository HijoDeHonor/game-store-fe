import React from "react";

function MyInventory({ todoslositems }) {
  console.log(todoslositems, "todoslositems");
  const ItemList = todoslositems.map((item) => (
    <div className="item" key={item.id}>
      <img src={item.img} alt={item.nombre} />
      <p>{item.nombre}</p>
      <p>{item.cantidad}</p>
    </div>
  ));

  return (
    <div className="inventory">
      <div className="item-container">{ItemList}</div>
    </div>
  );
}

export default MyInventory;