import addItem from "../../../services/addItem";
import deleteOffer from "../../../services/deleteOffer";
function tradeMake(Id, Offer, Request, UserNamePoster) {
  const userNameTrader = localStorage.getItem("username")||"Admin";//borrar esta linea cuando se ponga en uso la base de datos
  const userNamePoster = UserNamePoster;
  const offer = Offer;
  const request = Request;
  const id = Id;
  
  // descomentar cuando se ponga en uso la base de datos.

  // addItem(userNamePoster, request)
  // addItem(offer)
  // deleteOffer(id)
  

  //borrar el codigo de abajo cuando se ponga en uso la base de datos
  console.log(
    userNamePoster,
    "obtuvo ",
    Request[0].Name,
    "y ",
    userNameTrader,
    "obtuvo ",
    Offer[0].Name,
    "en la oferta #",
    id,
    "."
  );
}

export default tradeMake