import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      await dispatch(ordersActions.fetchOrders());
      setIsLoading(false);
    };

    fetchOrders();
  }, [dispatch]);

  if(isLoading) return <View style={styles.centered}><ActivityIndicator size="large" color={Colors.primary} /></View>

  if(orders.length === 0) {
    return <View style={styles.centered}><Text>No orders found.</Text></View>
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={orders}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrdersScreen;
