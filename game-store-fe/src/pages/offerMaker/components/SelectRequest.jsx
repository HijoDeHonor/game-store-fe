import {  ADD_TO_REQUEST, ITEMS_TO_REQUEST, SET_REQUEST } from "../../../utils/textConstants";
import { useOfferMaker } from "../provider/offerMakerProvider";
import SelectStage from "./ListSelector";

const SelectRequest = () => {
    const {state} = useOfferMaker
    const {request, serverItems} = state 
  const [newRequestItems, setNewRequestItems] = useState([]);

  useEffect(() => {
    dispatch({
      type: SET_REQUEST,
      data: newRequestItems,
    });
  }, [newRequestItems]);

  const updateRequestList = (list) => {
    setNewRequestItems(list);
  };

  return (
    <>
      <SelectStage
        titleReference={ITEMS_TO_REQUEST}
        updateList={updateRequestList} //update offer or request
        listOfItems={serverItems} // list of items from user or the server
        listKey={request} // either 'offer' or 'request'
        btnReference={ADD_TO_REQUEST}
      />
    </>
  );
};

export default SelectRequest;
