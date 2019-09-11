import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = props => {
  let TouchComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchComponent = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchComponent onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",

    height: 300
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  title: { fontSize: 18, marginVertical: 2, fontFamily: "open-sans-bold" },
  price: { fontSize: 14, color: "#888", fontFamily: "open-sans" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10
  }
});

export default ProductItem;
