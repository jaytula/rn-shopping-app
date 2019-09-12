import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import * as productsActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let formIsValid = true;
    for (const key in updatedValidities) {
      if (!updatedValidities[key]) formIsValid = false;
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid
    };
  }
  return state;
};

const EditProductScreen = props => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  console.log({ editedProduct });
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : ""
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      price: !!editedProduct,
      description: !!editedProduct
    },
    formIsValid: !!editedProduct
  });

  console.log({ formState });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form", [
        { text: "Okay" }
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier
    });
  };

  console.log({ formState });
  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Title"
          errorText="Please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onChangeText={props.onChangeText}
          formState={formState}
        />
        <Input
          label="Image Url"
          errorText="Please enter a valid Image Url"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={props.onChangeText}
          formState={formState}
        />
        {editedProduct ? null : (
          <Input
            label="Price"
            errorText="Please enter a valid price"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onChangeText={props.onChangeText}
            formState={formState}
          />
        )}
        <Input
          label="Description"
          errorText="Please enter a valid description"
          keyboardType="default"
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          onChangeText={props.onChangeText}
          formState={formState}
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submit = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submit}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 }
});

export default EditProductScreen;
