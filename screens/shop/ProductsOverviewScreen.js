import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: "ProductDetail",
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title
              }
            });
          }}
          showButtons
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    ></FlatList>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title="Menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
        ,
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          title="Cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
