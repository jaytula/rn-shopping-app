import React from "react";
import { FlatList, Platform, Button, Alert, StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = id => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          try {
            await dispatch(deleteProduct(id));
          } catch (err) {
            Alert.alert('Something went wrong', err.message);
          }
        }
      }
    ]);
  };

  if(userProducts.length === 0) {
    return <View style={styles.centered}><Text>No products found. Create some!</Text></View>
  }
  
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              props.navigation.navigate({
                routeName: "EditProduct",
                params: { productId: itemData.item.id }
              });
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        ></Item>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => navData.navigation.navigate("EditProduct")}
        ></Item>
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
