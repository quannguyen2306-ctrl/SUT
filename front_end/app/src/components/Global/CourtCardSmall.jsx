import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import { V, T } from '../../atoms/Atoms';

import { global, spacing } from '../../constants/constants';

import { splitAddress } from '../../middlewares/middlwares'

const CourtCardSmall = ({ court, navigation }) => {

    const address = splitAddress(court.address)

    if (navigation !== undefined) {
        return (
            <Pressable
                style={styles.orderSummary}
                onPress={
                    () => navigation.navigate("CourtDetail", {
                        _courtId: court._courtId,
                        name: court.courtName
                    })}
            >
                <Image source={{ uri: court.image[0] }} style={styles.image} />
                <V style={styles.textContainer}>
                    <V>
                        <T w={2}>{court.courtName}</T>
                        <T h={6}>{address}</T>
                    </V>

                    <V style={global.rowBetween}>
                        <T h={6} w={2}>{`${Number(court.pricePerHour).toLocaleString()} đ/giờ`}</T>
                    </V>
                </V>
            </Pressable >
        );
    } else {
        return (
            <Pressable
                style={styles.orderSummary}
            >
                <Image source={{ uri: court.image[0] }} style={styles.image} />
                <V style={styles.textContainer}>
                    <V style={{gap: 4}}>
                        <T w={2}>{court.courtName}</T>
                        <T h={6}>{address}</T>
                    </V>
                </V>
            </Pressable >
        );
    }
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

export default CourtCardSmall;
