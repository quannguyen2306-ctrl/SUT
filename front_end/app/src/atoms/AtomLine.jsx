import React from 'react';
import { View, StyleSheet } from 'react-native';
import { windowWidth } from '../context/context';
import { colors, spacing } from '../constants/constants';

const AtomLine = ({style}) => {
    return (
        <View style={{height: 2, ...styles.line, ...style}}>
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        borderRadius: spacing.brS,
        backgroundColor: colors.border,
        marginVertical: spacing.margin
    }
})

export { AtomLine };
