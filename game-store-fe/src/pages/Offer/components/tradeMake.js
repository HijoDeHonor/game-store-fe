function tradeMake(Id, Offer, Request, UserNamePoster) {
  const userNameTrader = localStorage.getItem("username")||"Admin";
  const userNamePoster = UserNamePoster;
  const offer = Offer;
  const request = Request;
  const id = Id;
  
  


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