import React from "react";
import { View, StyleSheet } from "react-native";

import { global, spacing, colors } from "../../constants/constants";

import { windowWidth } from "../../context/context";

import { T, V } from "../../atoms/Atoms";

import { calculateTimeAgo, calculatingRating } from "../../middlewares/middlwares";

import Star from '../../../assets/icons/Star.svg'

const CommentCard = ({ comment }) => {
    const timeAgo = calculateTimeAgo(new Date(comment.commentDate));
    const ratingArray = Array.from(Array(comment.rating).keys())

    return (
        <V style={styles.container}>
            <V style={styles.image}>
                <T textAlign="center" w={1} fontSize={18}>
                    {comment.name[0].toUpperCase()}
                </T>
            </V>
            <V style={{gap: 3}}>
                <V
                    style={{
                        ...global.rowBetween,
                        width: windowWidth - 40 - 10 - spacing.margin * 2,
                    }}
                >
                    <V style={{ ...global.center, ...global.row, gap: 5 }}>
                        <T w={3}>{comment.name} </T>
                        <V style={{ ...global.center, ...global.row, gap: 4 }}>
                            {ratingArray.map((item, index) => <Star key={index} width={14} height={14} fill={colors.primary} />)}
                        </V>
                    </V>
                    <T h={6}>{timeAgo}</T>
                </V>
                <T>{comment.comment}</T>
            </V>
        </V>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: spacing.s4,
        ...global.row,
        alignItems: "center",
        gap: 10,
        marginHorizontal: spacing.margin
    },
    image: {
        width: 40,
        height: 40,
        backgroundColor: "#FAD2D2",
        borderRadius: 100,
        ...global.center
    },
});

export default CommentCard;
