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
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    console.log({ resData });

    console.log(resData);

    dispatch({ type: SIGNUP });
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

    console.log({ response });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    console.log({ resData });

    console.log(resData);

    dispatch({ type: LOGIN });
  };
};
