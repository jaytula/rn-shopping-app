import { FIREBASE_DB } from "../../config";
export const ADD_ORDER = "PLACE_ORDER";

export const addOrder = (cartItems, totalAmount) => {
 
  return async dispatch => {
    const date = new Date();
    const response = await fetch(`${FIREBASE_DB}/orders/u1.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    });

    resData = await response.json();

    if(!response.ok) throw new Error('Something went wrong');
    console.log(response);
    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items: cartItems, amount: totalAmount, date }
    });
  };
};
