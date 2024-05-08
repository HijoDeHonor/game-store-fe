import React from 'react';
import Item from './Item';

function ItemList({ allTheItems, onClick, add, modal }) {
    const ItemList = allTheItems.map((item) => (
      <Item key={item.Id} item={item} onClick={onClick} add={add} modal={modal}/>
    ));
  
    return (
      
        <div className="item-list">{ItemList}</div>
      
    );
  }
export default ItemList;