import Item from '../../../components/Item/Item';
import ButtonTrade from './ButtonTrade.jsx';
import { acceptTrade } from '../../../services/offerService.js';
import { TRADE_SUCCESS, TRY_AGAIN } from '../../../utils/textConstants.js';
import { useSnackbarContext } from '../../../utils/snackbars.jsx';
import { useNavBarProvider } from '../../../components/NavBar/navbarProvider/navbarProvider.jsx';
import { useOffersProvider } from '../provider/offesProvider.jsx';

const Offer = ({ offer, setShow }) => {
  const { Id, Offer, Request, UserNamePoster, IdList } = offer;
  const { offersList ,updateOffers } = useOffersProvider();
  const { success, error } = useSnackbarContext();
  const { userName } = useNavBarProvider();

  const handleConfirmTrade = async () => {
    setShow(true);
    const isAcecepted = await acceptTrade(Id, userName);
    if (!isAcecepted) {
      error(TRY_AGAIN);
      window.location.reload();
      return;
    }
    success(TRADE_SUCCESS);
    console.log(offersList);
    const newOfferList = offersList.filter((o)=> o.Id !== Id);
    updateOffers(newOfferList);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShow(false);
  };

  return (
    <tr className="tr-table">
      <td className="td-id">{ IdList }</td>
      <td className="td-offer">
        <div className="item-container-offer">
          { Offer.map((item, index) => (
            <Item key={ index } item={ item } top="20px" imageWidth="40px" />
          )) }
        </div>
      </td>
      <td className="td-request">
        <div className="item-container-request">
          { Request.map((item, index) => (
            <Item key={ index } item={ item } top="20px" imageWidth="40px" />
          )) }
        </div>
      </td>
      <td className="td-btn">
        <ButtonTrade handleConfirmTrade={ handleConfirmTrade } offer={Offer} request={Request} owner={UserNamePoster} />
      </td>
    </tr >
  );
};

export default Offer;
