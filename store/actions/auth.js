export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

import { FIREBASE_APIKEY } from "../../config";
const AUTH_ENDPOINT = "https://identitytoolkit.googleapis.com/v1";

console.log({ FIREBASE_APIKEY });

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `${AUTH_ENDPOINT}/accounts:signUp?key=${FIREBASE_APIKEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    console.log({ response });
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "Email already exists!";
      } else if (errorId === "OPERATION_NOT_ALLOWED") {
        message = "Operation not allowed!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message = "Too many attempts. Try again later."
      }
      throw new Error(message);
    }

    const resData = await response.json();

    console.log(resData);

    const token = resData.idToken;
    const userId = resData.localId;

    dispatch({ type: SIGNUP, token, userId });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `${AUTH_ENDPOINT}/accounts:signInWithPassword?key=${FIREBASE_APIKEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    const token = resData.idToken;
    const userId = resData.localId;

    console.log({token, userId})
    dispatch({ type: LOGIN, token, userId });
  };
};
