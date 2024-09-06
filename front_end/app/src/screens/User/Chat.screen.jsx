import React from "react";
import {
    V,
    T,
    ________________________Spacer________________________,
    ________________________Line________________________
} from "../../atoms/Atoms";
import { StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

import { chatData } from "../../fixtures/fixtures";
import { colors, global, spacing } from '../../constants/constants'
import { windowWidth } from "../../context/context";
import TopAds from "../../components/Global/TopAds";
import { calculateTimeAgo } from '../../middlewares/middlwares'

export default function ChatScreen({ navigation }) {
    return (
        <V style={styles.container}>
            <TopAds />
            <________________________Spacer________________________ h={2} />
            <V style={{ padding: spacing.margin }}>
                <T h={1}>Trao đổi</T>
                <________________________Line________________________ />
                <FlatList
                    data={chatData}
                    keyExtractor={(item) => item._id}
                    ItemSeparatorComponent={() => <________________________Spacer________________________ h={3} />}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                navigation.navigate("SingleChat", {
                                    _courtId: item._courtId,
                                    courtName: item.courtName
                                })
                            }
                        >
                            <V style={styles.UserInfo}>
                                <V style={styles.UserImgWrapper}>
                                    <T h={3} marginBottom={0} textAlign="center">{item.courtName.split(' ')[item.courtName.split(' ').length - 1][0]}</T>
                                </V>
                                <V style={styles.TextSection}>
                                    <T style={styles.UserName} w={2} fontSize={15}>{item.courtName}</T>
                                    <V style={styles.UserInfoText}>
                                        <T style={styles.MessageText} color={colors.gray}>{item.messageText.length > 30 ? `${item.messageText.slice(0, 30)}...` : item.messageText}</T>
                                        <T>{`\u2022`}</T>
                                        <T style={styles.PostTime} color={colors.gray}>{calculateTimeAgo(item.messageTime)}</T>
                                    </V>
                                </V>
                            </V>
                        </TouchableOpacity>
                    )}
                />
            </V>
        </V>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    UserInfo: {
        ...global.rowBetween,
        gap: 10
    },
    UserImgWrapper: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 100,
        ...global.center
    },
    TextSection: {
        justifyContent: "center",
        width: windowWidth - 50 - (spacing.margin * 2) - 10,
        gap: 3
    },
    UserInfoText: {
        alignItems: 'flex-end',
        gap: 5,
        ...global.row,
    },
});
