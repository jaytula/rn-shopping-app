import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state =>
    Object.entries(state.cart.items).map(([key, value]) => ({
      id: key,
      ...value
    }))
  );

  const renderCartItem = itemData => (
    <View style={styles.item}>
      <View>
        <Text>{itemData.item.productTitle}</Text>
      </View>
      <View>
        <Text>{itemData.item.productPrice}</Text>
      </View>
      <View>
        <Text>{itemData.item.quantity}</Text>
      </View>
      <View>
        <Text>{itemData.item.sum}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          disabled={!cartItems.length}
          title="Order Now"
        />
      </View>
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

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
  item: {
    flexDirection: "row"
  }
});

export default CartScreen;
