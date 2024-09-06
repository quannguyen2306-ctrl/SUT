import { useState, memo } from "react";

import { StyleSheet, Pressable } from "react-native";

import { spacing, global } from "../../../constants/constants";
import { colors } from "../../../constants/constants";

import { imageHeight, windowWidth } from "../../../context/context";


import ImageCarousel from "../../Global/ImageCarousel";

import {
    V,
    DefaultButton,
    T,
    ________________________Spacer________________________,
    ________________________Line________________________,
    BulletPoint
} from "../../../atoms/Atoms";

import Star from '../../../../assets/icons/Star.svg'

import { calculatingRating, openMapsApp } from "../../../middlewares/middlwares";
import LikeNShare from "../../Global/likeNShare";

function RenderHeader({ court, navigation }) {

    const rating = calculatingRating(court.rating);
    const workingHours = {
        start: new Date(court.workingHours.start),
        end: new Date(court.workingHours.end),
    };

    return (
        <>
            <ImageCarousel image={court.image} />

            <LikeNShare court={court} />

            <V style={styles.container}>

                <________________________Spacer________________________ h={4} />

                <T h={2}>{court.courtName}</T>
                <T h={6} lineHeight={spacing.lineHeight}>{`${court.address}`}</T>

                <________________________Spacer________________________ h={5} />

                <V style={{ ...global.rowBetween, alignItems: 'flex-end', gap: 5 }}>
                    <V style={{ ...global.center, ...global.row }}>
                        <T h={3} marginBottom={0}>{`${Number(court.pricePerHour).toLocaleString()} đ`}</T>
                        <T>/giờ</T>
                    </V>
                    <V style={{ ...global.center, ...global.row, gap: 5 }}>
                        <T h={6}>{`${rating}`}</T>
                        <Star width={14} height={14} fill={colors.primary} />
                        <T h={6}>{`(${court.rating.totalRating} lượt đánh giá)`}</T>

                    </V>
                </V>

                {/* <T>{`⏳ ${formatTime(workingHours.start)}-${formatTime(
                    workingHours.end
                )}`}</T>
                <________________________Spacer________________________ h={5} /> */}


                <________________________Line________________________ />

                <V>
                    <T h={4}>Thông tin sân</T>
                    <T lineHeight={spacing.lineHeight}>{court.description}</T>

                    <________________________Spacer________________________ h={3} />

                    <T h={4}>Tiện ích</T>
                    {court.utility.map((item, index) => (
                        <BulletPoint key={index}>{item}</BulletPoint>
                    ))}
                </V>

                <________________________Line________________________ />

                <V style={{ ...global.row, alignItems: 'center', gap: spacing.margin }}>
                    <T h={4} marginBottom={0}>Còn thắc mắc?</T>
                    <DefaultButton
                        onPress={() => {
                            navigation.navigate('SingleChat', {
                                _courtId: "mike123",
                                courtName: court.courtName
                            })
                        }}
                    >
                        <V style={{
                            padding: 7,
                            paddingHorizontal: 20,
                            borderRadius: spacing.brS,
                            ...global.border
                        }}>
                            <T color={colors.primary}>Liên hệ</T>
                        </V>
                    </DefaultButton>
                </V>
                <________________________Line________________________ />

                <T h={4} marginBottom={5}>
                    Đánh giá
                </T>
            </V>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.margin,
        paddingTop: spacing.margin,
    },

    contactButton: {
        padding: 0,
        backgroundColor: 'white',
        borderRadius: spacing.brS,
    }
});

export default memo(RenderHeader)