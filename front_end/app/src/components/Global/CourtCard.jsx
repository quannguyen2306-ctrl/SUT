import {
    StyleSheet,
    Image,
} from "react-native";
import { aspectHeight, windowWidth } from "../../context/context";

import { T, V, Press, ________________________Spacer________________________ } from "../../atoms/Atoms";

import { global, spacing, colors } from "../../constants/constants";

import Star from '../../../assets/icons/Star.svg'


import { splitAddress, calculatingRating } from "../../middlewares/middlwares";

const CourtCard = ({ court, home, navigation }) => {
    const address = splitAddress(court.address);
    const rating = calculatingRating(court.rating);

    return (
        <Press
            onPress={() => {
                navigation.navigate("CourtDetail", {
                    _courtId: court._courtId,
                });
            }}
            style={{
                width: home == true ? windowWidth - spacing.margin * 3 : windowWidth - spacing.margin * 2
            }}
        >
            <Image
                source={{ uri: court.image[0] }}
                style={{
                    ...styles.image,
                    width: home == true ? windowWidth - spacing.margin * 3 : windowWidth - spacing.margin * 2,
                }}
            />
            <V style={{ padding: 15, paddingTop: 12 }}>

                <V style={{ ...global.rowBetween, alignItems: "flex-end" }}>
                    <T h={4} marginBottom={0} lineHeight={spacing.lineHeight}>{court.courtName}</T>
                </V>

                <T h={6} lineHeight={spacing.lineHeight}>{`${address} - 2.3 km`}</T>

                <________________________Spacer________________________ h={6} />

                <V style={{ ...global.rowBetween }}>
                    <V style={{ ...global.row }}>
                        <T w={2} marginBottom={0} lineHeight={spacing.lineHeight}>{`${Number(court.pricePerHour).toLocaleString()} đ`}</T>
                        <T h={6} lineHeight={spacing.lineHeight}>/giờ</T>
                    </V>
                    <V style={{ ...global.center, ...global.row }}>
                        <T h={6}>{`(${court.rating.totalRating}) ${rating} `}</T>
                        <Star width={14} height={14} fill={colors.primary} />
                    </V>
                </V>
            </V>
        </Press>
    );
};

const styles = StyleSheet.create({
    image: {
        borderTopLeftRadius: spacing.brS,
        borderTopRightRadius: spacing.brS,
        height: aspectHeight,
    }
});

export default CourtCard;
