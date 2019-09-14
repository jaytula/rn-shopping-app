import { FIREBASE_DB } from "../../config";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  pid: id
});

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const response = await fetch(FIREBASE_DB, {
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
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl
    }
  };
};
