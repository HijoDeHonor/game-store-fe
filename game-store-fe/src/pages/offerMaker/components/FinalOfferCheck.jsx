import { useOfferMaker } from '../provider/offerMakerProvider';
import { FINAL_OFFER, FINAL_REQUEST } from '../../../utils/textConstants';

import OfferList from './SelectedList';

const FinalOfferCheck = () => {
  const { state } = useOfferMaker();

  const { offer, request } = state;

  return (
    <>
      <div className="om">
        <div className="om-final-check">
          <div className="om-final-check-body">
            <p>{FINAL_OFFER}</p>
            <div className="offercheck">
              <OfferList items={offer} recicler={false} />
            </div>
          </div>
          <div className="om-final-check-body">
            <p>{FINAL_REQUEST}</p>
            <div className="offercheck">
              <OfferList items={request} recicler={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalOfferCheck;
