export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup =(username,phone_number,email,password) => {
  return async dispatch => {
    const response = await fetch(
      'https://stalgia-webserver.herokuapp.com/auth/register/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:username,
          phone_number:phone_number,
          email: email,
          password: password, 
          returnSecureToken: true
        })
      }
    );
     
    // if (!response.ok) {
    //   const errorResData = await response.json();
    //   const errorId = errorResData.error.message;
    //   let message = 'Something went wrong!';
    //   if (errorId === 'EMAIL_EXISTS') {
    //     message = 'This email exists already!';
    //   }
    //   throw new Error(message);
    // }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP, token:resData.token, userId:resData.user.id});
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://stalgia-webserver.herokuapp.com/auth/login/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    // if (!response.ok) {
    //   const errorResData = await response.json();
    //   const errorId = errorResData.error.message;
    //   let message = 'Something went wrong!';
    //   if (errorId === 'EMAIL_NOT_FOUND') {
    //     message = 'This email could not be found!';
    //   } else if (errorId === 'INVALID_PASSWORD') {
    //     message = 'This password is not valid!';
    //   }
    //   throw new Error(message);
    // }
    
    const resData = await response.json();
    // console.log(resData);
    dispatch({type: LOGIN, token:resData.token, userId:resData.user.id});
  };
};
