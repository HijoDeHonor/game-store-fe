import ItemList from "../../../components/ItemList/Itemlist";

const SelectedList = ({ items, deleteAdd, recicler, modal }) => {
  return (
    <ItemList
      allTheItems={items}
      modal={modal}
      recicler={recicler}
      deleteAdd={deleteAdd ? deleteAdd : null}
    />
  );
};

export default SelectedList;
