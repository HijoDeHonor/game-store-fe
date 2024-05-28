import ItemList from "../../../components/Itemlist";

const OfferList = ({ items, deleteAdd, recicler, modal }) => {

  return (
    <ItemList
      allTheItems={items}
      modal={modal}
      recicler={recicler}
      deleteAdd={deleteAdd ? deleteAdd : null}
    />
  );
};

export default OfferList;
