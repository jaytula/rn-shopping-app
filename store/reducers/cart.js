import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };

    case REMOVE_FROM_CART:
      const productId = action.productId;
      const product = state.items[productId];
      const updatedItems = { ...state.items };
      if (product.quantity > 1) {
        updatedItems[productId] = new CartItem(
          product.quantity - 1,
          product.productPrice,
          product.productTitle,
          product.sum - product.productPrice
        );
      } else {
        delete updatedItems[productId];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount:
          Math.round((state.totalAmount - product.productPrice) * 100) / 100
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      const selectedItem = state.items[action.productId];
      if (!selectedItem) return state;
      const updatedItems2 = { ...state.items };
      const newTotalAmount =
        Math.round((state.totalAmount - selectedItem.sum) * 100) / 100;
      delete updatedItems2[action.productId];
      return { ...state, items: updatedItems2, totalAmount: newTotalAmount };

    default:
      return state;
  }
};
