import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { aspectHeight, windowWidth } from '../../context/context';

import Filter from '../../../assets/icons/Filter.svg'
import Search from '../../../assets/icons/Search.svg'

import { BaseButton } from 'react-native-gesture-handler';

import { V, T } from '../../atoms/Atoms';

import { colors, global, spacing } from '../../constants/constants';

const SearchFilter = ({ home, navigation, setFilterOn }) => {
    return (
        <V style={home == true ? {
            ...styles.container,
            position: 'absolute',
            top: aspectHeight - (55 / 2)
        } : { ...styles.container }}>
            <BaseButton
                style={styles.searchContainer}
                onPress={() => {
                    navigation.navigate('Search')
                }}>
                <V style={{ ...global.row, alignItems: 'center' }}>
                    <Search width={20} height={20} fill={colors.primary}/>
                    <T color="gray">   Tìm sân</T>
                </V>
            </BaseButton>
            <Pressable onPress={() => setFilterOn(true)} style={styles.filterContainer}>
                <Filter width={17} height={17} />
            </Pressable>
        </V>
    );
}

const styles = StyleSheet.create({
    container: {
        ...global.row,
        paddingHorizontal: spacing.margin,
        gap: 10,
        zIndex: 1000000000
    },
    searchContainer: {
        backgroundColor: 'white',
        width: windowWidth - 60 - 10 - spacing.margin * 2,
        height: 55,
        borderRadius: spacing.brS,
        paddingLeft: spacing.margin,
        justifyContent: 'center',
        zIndex: 1000000,
        ...global.shadow,
        ...global.border,
        borderColor: colors.border
    },
    filterContainer: {
        backgroundColor: 'white',
        width: 55,
        height: 55,
        borderRadius: spacing.brS,
        ...global.center,
        ...global.shadow,
        ...global.border,
        borderColor: colors.border
    }
})


export default SearchFilter;
