import DBServerData from "../utils/DB-Server.json";
import DBUserData from "../utils/DB-User.json";

export const getAllItems = () => {
  const data = DBServerData;
  return data;
};

export const getUserItems = () => {
  const data = DBUserData;
  return data;
};


