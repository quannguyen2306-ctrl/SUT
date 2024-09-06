import React from "react";
import { View, StyleSheet } from "react-native";

import { AtomText as T } from "./AtomText";

const AtomBulletPoint = ({ children }) => {
  return (
    <T marginTop={7} marginLeft={7}>
      {`\u2022 ${children}`}
    </T>
  );
};

const styles = StyleSheet.create({});

export { AtomBulletPoint };
