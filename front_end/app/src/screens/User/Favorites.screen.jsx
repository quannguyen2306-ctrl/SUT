import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';

import {
    T,
    V,
    ________________________Spacer________________________,
    ________________________Line________________________
} from '../../atoms/Atoms';

import { spacing, global } from '../../constants/constants';
import { _userId, client } from '../../context/context';

import CourtCardSmall from '../../components/Global/CourtCardSmall'
import TopAds from '../../components/Global/TopAds'
import CompensateTabBar from '../../components/Global/CompensateTabBar'
import { useIsFocused } from '@react-navigation/native'

import { GET_FAVORITES } from '../../schemas/schemas';


const FavoritesScreen = ({ navigation }) => {

    const [favoriteData, setFavoriteData] = useState(null)
    const isFocused = useIsFocused()

    async function getFavorites() {

        const { data, loading, error } = await client.query({
            query: GET_FAVORITES,
            variables: {
                "userId": _userId,
                params: {
                    start: 0,
                    end: 5
                }
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        setFavoriteData(data.getFavorites)

    }

    useEffect(() => {
        getFavorites()
    }, [isFocused])


    return (
        <View
            style={{ flex: 1, backgroundColor: 'white' }}
        >
            <TopAds />

            <V style={styles.container}>
                <________________________Spacer________________________ h={2} />
                <T h={1}>Yêu thích</T>
                <________________________Line________________________ />
            </V>

            {favoriteData === null ? <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V> : <>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={favoriteData}
                    style={{ paddingHorizontal: spacing.margin }}
                    initialNumToRender={2}
                    renderItem={({ item }) => (
                        <V>
                            <CourtCardSmall court={item} navigation={navigation} />
                        </V>
                    )}
                    keyExtractor={(item, index) => index}
                    // ListEmptyComponent={sad face nothing here:<}
                    ItemSeparatorComponent={() => <View style={{ height: spacing.margin }}></View>}
                    ListFooterComponent={() => <View style={{ height: spacing.margin }}></View>}
                // onRefresh={}
                />
                <CompensateTabBar />
            </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.margin,
        paddingBottom: 0
    }
})

export default FavoritesScreen;
