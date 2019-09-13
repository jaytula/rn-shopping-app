import React from "react";

import { createStore, combineReducers } from "redux";

import functions from "./functions";

import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import productsReducer from "./store/reducers/products";

import * as productsActions from "./store/actions/products";

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer
});

const store = createStore(rootReducer);

test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

test("Store Check", () => {
  expect(store).toHaveProperty("getState");
  expect(store).toHaveProperty("dispatch");

  let state = store.getState();
  expect(state).toHaveProperty("cart");
  expect(state).toHaveProperty("orders");
  expect(state).toHaveProperty("products");
  expect(state.products).toHaveProperty("availableProducts");
  expect(state.products).toHaveProperty("userProducts");
  expect(state.products.availableProducts.length).toBe(6);
  expect(state.products.userProducts.length).toBe(6);

  store.dispatch(
    productsActions.createProduct(
      "Test Title",
      "Test Desc",
      "http://test-image",
      3.0
    )
  );
  state = store.getState();
  expect(state.products.availableProducts.length).toBe(7);
  expect(state.products.userProducts.length).toBe(7);
  expect(state.products.availableProducts[0]).toHaveProperty("id");
});

test("productsReducer", () => {
  //productsActions.createProduct
  let state = productsReducer();
  expect(state.availableProducts.length).toBe(6);
  expect(state.userProducts.length).toBe(6);
  expect(state.availableProducts[0]).toHaveProperty("id");
  state = productsReducer(
    state,
    productsActions.createProduct("t", "d", "i", 1.11)
  );
  expect(state.availableProducts.length).toBe(7);
  expect(state.userProducts.length).toBe(7);
  expect(state.availableProducts[0]).toHaveProperty("id");
});
