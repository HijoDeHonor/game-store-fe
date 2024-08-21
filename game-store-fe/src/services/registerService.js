import { ERROR_TRY_AGAIN, SUCCESSFULL_SIGNIN, URL_BACK } from '../utils/textConstants.js';


const handleSubmit = async (newUser) => {
  try {
    const response = await fetch(`${URL_BACK}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      throw Error(ERROR_TRY_AGAIN);
    }

    const userCreate = await response.json();
    return {
      ok: true,
      userName: userCreate.userName,
      message: SUCCESSFULL_SIGNIN,
    };

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default handleSubmit;
