import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, EDIT_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => (prod.ownerId = "u1"))
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          product => product.id !== action.productId
        )
      };

    case EDIT_PRODUCT:

    default:
      return state;
  }
};
