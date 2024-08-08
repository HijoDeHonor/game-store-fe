import { ERROR_TRY_AGAIN, SUCCESSFULL_SIGNIN, URL_BACK } from '../utils/textConstants.js';


const handleSubmit = async (newUser, setError) => {
  try {
    const response = await fetch(`${URL_BACK}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setError(errorMessage || ERROR_TRY_AGAIN);
      return;
    }

    const userCreate = await response.json();
    setError('');
    return {
      ok: true,
      userName: userCreate.userName,
      message: SUCCESSFULL_SIGNIN,
    };

  } catch (error) {
    console.log(error);
    setError(ERROR_TRY_AGAIN);
  }
};

export default handleSubmit;
