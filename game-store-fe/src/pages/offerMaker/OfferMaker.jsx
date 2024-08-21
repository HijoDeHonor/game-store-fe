import { useEffect } from 'react';
import {
  OfferMakerProvider,
  useOfferMaker,
} from './provider/offerMakerProvider';
import './offerMaker.css';
import { getAllItems, getUserItems } from '../../services/itemService.js';
import {
  ERROR_CREATE_OFFER,
  HOME,
  LOCAL_USERNAME,
  SET_CURRENT_STAGE,
  SET_SERVER_ITEMS,
  SET_USER_ITEMS,
  SUCCES_CREATE_OFFER,
} from '../../utils/textConstants';
import Stepper from './components/stepper';
import SelectOffer from './components/SelectOffer';
import SelectRequest from './components/SelectRequest';
import FinalOfferCheck from './components/FinalOfferCheck';
import { createOffer } from '../../services/offerService.js';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from '../../utils/snackbars.jsx';


const OfferMaker = () => {
  const { state, dispatch } = useOfferMaker();
  const { currentStage, userItems, serverItems, offer, request } = state;

  const { success, error } = useSnackbarContext();

  const navigate = useNavigate();
  // 'fetch' to get the userItems and the serverItems then set in the context
  useEffect(() => {
    getUserItems(localStorage.getItem(LOCAL_USERNAME)).then((result) => {
      const items = result.map((item) => {
        const maxQuantity = item.Quantity;
        item.Quantity = 0;

        return { ...item, maxQuantity };
      });
      dispatch({
        type: SET_USER_ITEMS,
        data: items,
      });
    });
    getAllItems().then((result) => {
      dispatch({
        type: SET_SERVER_ITEMS,
        data: result,
      });
    });
  }, []);

  // Stage controls
  const nextStage = () => {
    if (offer.length > 0 && currentStage === 0) {
      // Check if the offer has any element inside, if so, go to the next stage, if not  it does nothing
      const newStage = currentStage + 1;
      dispatch({
        type: SET_CURRENT_STAGE,
        data: newStage,
      });
    } else if (request.length > 0 && currentStage === 1) {
      // Check if the request has any element inside, if so, go to the next stage, if not it does nothing
      const newStage = currentStage + 1;
      dispatch({
        type: SET_CURRENT_STAGE,
        data: newStage,
      });
    }
  };
  const backStage = () => {
    //this does not do checks, and only returns to a previous stage
    const newStage = currentStage - 1;
    dispatch({
      type: SET_CURRENT_STAGE,
      data: newStage,
    });
  };

  

  const confirmCreateOffer = async () => {
    const sendOffer= offer.map(({ Name, Quantity }) => ({ itemName: Name, quantity: Quantity }));
    const sendRequest= request.map(({ Name, Quantity }) => ({ itemName: Name, quantity: Quantity }));
    
    if (await createOffer(sendOffer,sendRequest)) {
      success(SUCCES_CREATE_OFFER);
      navigate(HOME);
      window.location.reload();
    }
    error(ERROR_CREATE_OFFER);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.reload();
  };

  return (
    <>
      {
        userItems.length > 0 && serverItems.length > 0 && (
          <div className="offerMaker-container">
            <Stepper
              steps={[
                <SelectOffer key={'SelectOffer'} />,
                <SelectRequest key={'SelectReuest'} />,
                <FinalOfferCheck key={'FinalOfferCheck'} />,
              ]}
              currentStep={currentStage}
              nextStep={nextStage}
              prevStep={backStage}
              onSubmit={confirmCreateOffer}
            />
          </div>
        )
      }
    </>
  );
};

const OfferMakerWithProvider = () => {
  return (
    <OfferMakerProvider>
      <OfferMaker />
    </OfferMakerProvider>
  );
};

export default OfferMakerWithProvider;
