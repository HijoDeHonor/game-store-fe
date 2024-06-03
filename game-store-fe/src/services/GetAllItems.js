import DBServerData from "../utils/DB-Server.json";
import DBUserData from "../utils/DB-User.json";

export const getAllItems = async () => {
  return new Promise((resolve) => {
    resolve(DBServerData);
  });
};

export const getUserItems = async () => {
  return new Promise((resolve) => {
    resolve(DBUserData);
  });
};