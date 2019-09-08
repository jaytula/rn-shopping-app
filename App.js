import React, { useState } from "react";
import { Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import { composeWithDevTools } from "redux-devtools-extension";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";

import ShopNavigator from "./navigation/ShopNavigator";
import { AppLoading } from "expo";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

const store = createStore(rootReducer, composeWithDevTools());

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
