import React from "react";
import { View, StyleSheet } from "react-native";

const space = {
  1: 30,
  2: 25,
  3: 20,
  4: 15,
  5: 10,
  6: 3
};

const AtomSpacer = ({ h }) => {
  return <View style={{ height: space[h] }}></View>;
};

const styles = StyleSheet.create({});

export { AtomSpacer };
