import React from "react";
import { View } from "react-native";

const AtomView = ({ children, ...props }) => {
  return <View {...props}>{children}</View>;
};

export { AtomView };
