import React from 'react';
import Item from './Item';

function ItemList({ allTheItems, onClick, add }) {
    const ItemList = allTheItems.map((item) => (
      <Item key={item.id} item={item} onClick={onClick} add={add}/>
    ));
  
    return (
      
        <div className="item-list">{ItemList}</div>
      
    );
  }
  

export default ItemList;