import Item from '../Item/Item';
import './ItemList.css';

function ItemList ({ allTheItems, onClick, add, modal, recicler, deleteAdd }) {
  const ItemList = allTheItems.map((item) => (
    <Item
      key={item.Name}
      item={item}
      onClick={onClick}
      add={add}
      modal={modal}
      recicler={recicler}
      deleteAdd={deleteAdd}
      imageWidth={'60px'}
    />
  ));

  return <div className="item-list">{ItemList}</div>;
}
export default ItemList;
