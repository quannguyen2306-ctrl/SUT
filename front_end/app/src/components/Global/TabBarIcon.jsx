import React from 'react';
import { View, StyleSheet } from 'react-native';

import { V, T } from '../../atoms/Atoms';
import { colors } from '../../constants/constants';
import { global } from '../../constants/constants';

const TabBarIcon = ({ name, icon, focused }) => {
    return (
        <V style={[{ ...global.center, gap: 5 }, focused ? null : { opacity: 0.8 }]}>
            {icon}
            <T h={6} fontSize={11} style={focused ? { color: colors.primary } : null}>{name}</T>
        </V>
    );
}

const styles = StyleSheet.create({})

export default TabBarIcon;
