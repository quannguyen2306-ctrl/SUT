import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { colors, global, spacing } from "../../../constants/constants";

import { Press, T, V } from "../../../atoms/Atoms";

const Chip = ({ sport, navigation }) => {
    return (
        <Pressable
            onPress={() => {
                navigation.navigate(sport.name)
            }}
            style={{
                ...global.center,
                ...global.row,
                marginRight: 20,
            }}
        >
            <V style={{
                ...styles.chip,
            }}>
                <T h={2} marginBottom={0}>{sport.icon}</T>
            </V>
            <V style={{
                marginLeft: -18,
                paddingLeft: 25,
                paddingRight: 10,
                padding: 7,
                borderRadius:
                    spacing.brS,
                backgroundColor: colors.border
            }}>
                <T>{sport.name}</T>
            </V>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    chip: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        ...global.center,
        width: 50,
        height: 50,
        zIndex: 2000000000,
        borderColor: 'white',
        borderWidth: 2
    }
});

export default Chip;
