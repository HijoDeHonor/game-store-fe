import { LOCAL_USERNAME, LOGIN_USER_PASS_ERROR, SUCCESSFULL_LOGIN, URL_BACK } from '../utils/textConstants.js';


const logInService = async (user) => {
  try {
    const response = await fetch(`${URL_BACK}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include'
    });

    if (!response.ok) {
      throw Error(LOGIN_USER_PASS_ERROR);
      
    }

    const userFound = await response.json();

    localStorage.setItem(LOCAL_USERNAME, userFound.userName);

    return {
      ok: true,
      userName: userFound.userName,
      message: SUCCESSFULL_LOGIN,
    };
  } catch (error) {
    console.log(error);
  }
};

export default logInService;
