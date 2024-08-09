function tradeMake (Id, Offer, Request, UserNamePoster) {
  const userNameTrader = localStorage.getItem('GameStore-userName');//borrar esta linea cuando se ponga en uso la base de datos
  const userNamePoster = UserNamePoster;
  const id = Id;
  
  // restore this comented code when the back end is ready

  // addItem(userNamePoster, request)
  // addItem(offer)
  // deleteOffer(id)
  

  //delete this lines when the back end is ready or make a use of it
  console.log(
    userNamePoster,
    'obtuvo ',
    Request[0].Name,
    'y ',
    userNameTrader,
    'obtuvo ',
    Offer[0].Name,
    'en la oferta #',
    id,
    '.'
  );
}

export default tradeMake;