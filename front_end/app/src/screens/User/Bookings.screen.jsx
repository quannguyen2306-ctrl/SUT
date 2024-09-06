import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import {
    T,
    V,
    ________________________Spacer________________________,
    ________________________Line________________________
} from '../../atoms/Atoms';

import { spacing, global } from '../../constants/constants';

import BookingCardSmall from '../../components/Global/BookingCardSmall'
import TopAds from '../../components/Global/TopAds'
import CompensateTabBar from '../../components/Global/CompensateTabBar'

import { GET_BOOKINGS } from '../../schemas/schemas';
import { _userId, client } from '../../context/context';


const BookingsScreen = ({ navigation }) => {
    const [bookingData, setBookingData] = useState(null)
    const isFocused = useIsFocused()

    async function getBookings() {
        const { data } = await client.query({
            query: GET_BOOKINGS,
            variables: {
                "bookerId": _userId,
                params: {
                    start: 0,
                    end: 5
                }
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        setBookingData(data.getBookings)
    }

    useEffect(() => {
        getBookings()
    }, [isFocused])

    return (
        <V
            style={{ flex: 1, backgroundColor: 'white' }}
        >
            <TopAds />
            <V style={styles.container}>
                <________________________Spacer________________________ h={2} />
                <T h={1}>Đơn đặt</T>
                <________________________Line________________________ />
            </V>

            {bookingData === null ? <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V> : <>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={bookingData}
                    style={{ paddingHorizontal: spacing.margin }}
                    initialNumToRender={2}
                    renderItem={({ item }) => (
                        <V >
                            <BookingCardSmall court={item} navigation={navigation} />
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
        </V>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.margin,
        paddingBottom: 0
    }
})

export default BookingsScreen;
