import DBServerData from "../utils/DB-Server.json";
import DBUserData from "../utils/DB-User.json";
const GetAllItems = (userName) => {
const data = userName ? DBUserData : DBServerData 
return data
}

export default GetAllItems;