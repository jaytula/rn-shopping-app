import React from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={orders}
      renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
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
    headerTitle: "Your Orders"
  };
};

const styles = StyleSheet.create({});

export default OrdersScreen;
