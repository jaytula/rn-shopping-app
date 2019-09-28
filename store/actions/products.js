import { FIREBASE_DB } from "../../config";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${FIREBASE_DB}/products.json`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: "SET_PRODUCTS",
        products: loadedProducts
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`${FIREBASE_DB}/products/${id}.json?token=${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if(!response.ok) {
      throw new Error('Error deleting');
    }
    dispatch({
      type: DELETE_PRODUCT,
      pid: id
    })
  }
}
  

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${FIREBASE_DB}/products.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, imageUrl, price })
    });

    const resData = await response.json();
    console.log({ resData });
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${FIREBASE_DB}/products/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, description, imageUrl})
    });

    if(!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch( {
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  }

};
