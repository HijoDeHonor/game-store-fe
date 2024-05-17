import React from "react";

function ItemMini({ item }) {
    

    return (
        <div className="item-mini">
            <img className="item-mini-img" src={item.Img} alt={item.Img} />
            <p>{item.Name}{item.Quantity !== 1 && ` x ${item.Quantity}`}</p>
        </div>
    );
}

export default ItemMini;