import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import { global, spacing } from "../../constants/constants";

import { windowWidth } from "../../context/context";

const BottomBar = ({ children }) => {
    return (
        <View style={styles.bottomBar}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: windowWidth,
        ...global.rowBetween,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: spacing.margin,
        ...global.shadow
    },
});

export default BottomBar;
