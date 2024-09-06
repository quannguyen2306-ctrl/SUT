import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import Search from '../../../assets/icons/Search.svg'

import { ActivityIndicator } from 'react-native';

import { client } from '../../context/context'

import { View, StyleSheet, Pressable, Keyboard, FlatList } from 'react-native';

import { colors, global, spacing } from '../../constants/constants';
import { Input, V, T, ________________________Line________________________ } from '../../atoms/Atoms'

// import { searchResults } from '../../fixtures/fixtures';
import { SEARCH_COURTS } from '../../schemas/schemas';

import CourtCardSmall from '../../components/Global/CourtCardSmall'

const SearchScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])

    const [loading, setLoading] = useState(false)

    async function handleSubmit() {

        const { data } = await client.query({
            query: SEARCH_COURTS,
            variables: { searchInput: search },
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        setLoading(false)
        setResults(data.searchCourts)
    }

    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1, backgroundColor: 'white' }} accessible={false}>
            <V style={styles.searchContainer}>
                <Input
                    placeholder="Tìm sân"
                    onChangeText={setSearch}
                    value={search}
                    autoFocus={true}
                    style={styles.inputStyle}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                        setLoading(true)
                        handleSubmit()
                    }}
                />
                <Pressable onPress={() => {
                    setLoading(true)
                    handleSubmit()
                }} style={styles.submitButton}>
                    <Search width={20} height={20} fill={colors.primary} />
                </Pressable>
            </V>
            <V style={{ paddingHorizontal: spacing.margin }}>
                <________________________Line________________________ />
            </V>
            {loading === true ? <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V> : <>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={results}
                    style={{ paddingHorizontal: spacing.margin }}
                    initialNumToRender={2}
                    renderItem={({ item }) => (
                        <V>
                            <CourtCardSmall court={item} navigation={navigation} />
                        </V>
                    )}
                    keyExtractor={(item) => String(item._id)}
                    // ListEmptyComponent={sad face nothing here:<}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
                    ListFooterComponent={() => <View style={{ height: spacing.margin }}></View>}
                // onRefresh={}
                />
            </>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        margin: spacing.margin,
        ...global.row,
        gap: 10
    },
    inputStyle: {
        flex: 5,
        backgroundColor: 'white',
        ...global.border,
        borderColor: colors.border
    },
    submitButton: {
        backgroundColor: 'white',
        flex: 1,
        ...global.center,
        ...global.border,
        borderRadius: spacing.brS,
        borderColor: colors.border
    }
})

export default SearchScreen;
