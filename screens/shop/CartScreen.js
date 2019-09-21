import React, {useState} from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";

import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import Card from "../../components/UI/Card";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state =>
    Object.entries(state.cart.items)
      .map(([key, value]) => ({
        id: key,
        ...value
      }))
      .sort((a, b) => (a.id > b.id ? 1 : -1))
  );

  const dispatch = useDispatch();

  const renderCartItem = ({ item }) => (
    <CartItem
      quantity={item.quantity}
      title={item.productTitle}
      amount={item.sum}
      onRemove={() => dispatch(cartActions.removeFromCart(item.id))}
      deletable
    />
  );

  const sendOrderHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            onPress={sendOrderHandler}
            disabled={!cartItems.length}
            title="Order Now"
          />
        )}
      </Card>
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={cartItems}
          renderItem={renderCartItem}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CartScreen;
