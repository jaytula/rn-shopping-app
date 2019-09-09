import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

import Colors from "../../constants/Colors";

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={23}
      IconComponent={Ionicons}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    ></HeaderButton>
  );
};

export default CustomHeaderButton;
