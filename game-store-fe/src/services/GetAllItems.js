import DBServerData from "../utils/DB-Server.json"
import DBUserData from "../utils/DB-User.json"


const getAllItems = (userName) => {
  if (userName){
   const data = DBUserData;
    return data;
  } const data = DBServerData;
  return data 
};

export {getAllItems};