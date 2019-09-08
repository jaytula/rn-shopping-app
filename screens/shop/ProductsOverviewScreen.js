import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={products}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    ></FlatList>
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const styles = StyleSheet.create({
  screen: {}
});

export default ProductsOverviewScreen;
