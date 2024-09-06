import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '../constants/constants';

const AtomSection = () => {
    return (
        <View style={styles.section}>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        width: '100%',
        height: 6,
        backgroundColor: colors.border
    }
})

export { AtomSection };
