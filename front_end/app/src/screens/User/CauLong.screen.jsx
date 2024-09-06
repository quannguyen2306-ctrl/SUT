import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
    V,
    T,
    ________________________Spacer________________________,
} from '../../atoms/Atoms';

import { useQuery } from '@apollo/client';


import { courts, sports } from "../../fixtures/fixtures";
import { GET_COURTS } from "../../schemas/schemas";

import TopAds from "../../components/Global/TopAds";
import SearchFilter from "../../components/Global/Search_Filter";
import CourtCard from "../../components/Global/CourtCard";

import { spacing } from '../../constants/constants';

const CauLongScreen = ({ navigation }) => {
    const params = {
        start: 0,
        end: 10,
    };

    const { loading, error, data } = useQuery(GET_COURTS, {
        variables: {
            params: params,
        },
    });

    if (loading) return <T>Loading...</T>;
    if (error) {
        console.log(error.message)
        return <T>Error : {error.message}</T>;
    }

    return (
        <V style={{ flex: 1, backgroundColor: 'white' }}>
            <V style={{ marginVertical: spacing.margin }}>
                <SearchFilter navigation={navigation} />
            </V>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data.courts}
                style={{ paddingHorizontal: spacing.margin }}
                initialNumToRender={2}
                renderItem={({ item }) => (
                    <V style={styles.boxShadow}>
                        <CourtCard court={item} home={false} navigation={navigation} />
                    </V>
                )}
                keyExtractor={(item) => item._id}
                // ListEmptyComponent={sad face nothing here:<}
                ItemSeparatorComponent={() => <View style={{ height: spacing.margin }}></View>}
                ListFooterComponent={() => <View style={{ height: spacing.margin }}></View>}
            // onRefresh={}
            />
        </V>
    );
}

const styles = StyleSheet.create({
    boxShadow: {
        ...global.center,
        backgroundColor: 'white',
        ...global.shadow,
        borderRadius: spacing.brS,
    },
})

export default CauLongScreen;
