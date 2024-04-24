import React from 'react';
import Item from './Item';

function ItemList({ allTheItems, onClick }) {
    const ItemList = allTheItems.map((item) => (
      <Item key={item.id} item={item} onClick={onClick} top={"84%"} imageWidth={"60px"}/>
    ));
  
    return (
      
        <div className="item-list">{ItemList}</div>
      
    );
  }
  

export default ItemList;