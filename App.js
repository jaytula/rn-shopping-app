import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

import ShopNavigator from "./navigation/ShopNavigator";
import { AppLoading } from "expo";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [ReduxThunk];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
