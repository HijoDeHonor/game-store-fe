import React from 'react';
import Item from './item'; // Nuevo componente

function ItemList({ items }) {
    let itemList = [];
    items.forEach((item) => {
       itemList.push( <Item key={item.Id} item={item} />)

    })



    return (
        <div>
            {itemList}
        </div>
    );
}

export default ItemList;