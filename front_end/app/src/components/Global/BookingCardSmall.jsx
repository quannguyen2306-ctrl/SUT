import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import { V, T } from '../../atoms/Atoms';

import { global, spacing } from '../../constants/constants';

import {
    splitAddress,
    formatDate,
    displayTimeSelection,
    reverseGap
} from '../../middlewares/middlwares'

const BookingCardSmall = ({ court, navigation }) => {

    const address = splitAddress(court.address)

    const timeSelection = displayTimeSelection(court.timeSelection)
    const date = new Date(parseInt(court.date))
    console.log(date)
    
    const dateBooked = formatDate(date)
    const end = reverseGap(court.timeSelection[court.timeSelection.length - 1])
    const bookedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.endHour, end.endMinute)
    const today = new Date()

    return (
        <Pressable
            style={[styles.orderSummary, court.cancelled == true ? { opacity: 0.5 } : null, today > bookedDate ? { opacity: 0.5 } : null]}
            onPress={
                () => navigation.navigate("BookingDetail", {
                    _bookingId: court._bookingId,
                })}
        >
            <Image source={{ uri: court.image[0] }} style={styles.image} />
            <V style={styles.textContainer}>
                <V>
                    <T w={2}>{court.courtName}</T>
                    <T h={6}>{address}</T>
                </V>
                <V style={{ ...global.rowBetween }}>
                    <T h={6} w={2}>{dateBooked}</T>
                    <T h={6} w={2}>{timeSelection}</T>
                </V>
            </V>
        </Pressable >
    );
}

const styles = StyleSheet.create({
    orderSummary: {
        ...global.row,
        gap: 10,
    },
    image: {
        // width: 0.35 * windowWidth,
        flex: 1.7,
        height: 75,
        borderRadius: spacing.brS - 5,
    },
    textContainer: {
        flex: 3.4,
        justifyContent: 'center',
        gap: 10
    }
})

export default BookingCardSmall;
