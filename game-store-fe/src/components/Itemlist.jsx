import React from 'react';
import Item from './Item';

function ItemList({ allTheItems, onClick, add, modal, recicler }) {
    const ItemList = allTheItems.map((item) => (
      <Item key={item.Id} item={item} onClick={onClick} add={add} modal={modal} recicler={recicler} />
    ));
  
    return (
      
        <div className="item-list">{ItemList}</div>
      
    );
  }
export default ItemList;