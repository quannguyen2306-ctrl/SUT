import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import {
    T,
    V,
    ________________________Line________________________,
    ________________________Spacer________________________,
    DefaultButton
} from '../../atoms/Atoms';

import { global, spacing, colors } from '../../constants/constants'

import CompensateTabBar from '../../components/Global/CompensateTabBar'

function ProfileScreen({ navigation }) {
    const name = 'Đan lé'

    return (
        <V style={styles.container}>
            < ________________________Spacer________________________ h={3} />

            <V style={{ ...global.row, alignItems: 'center', gap: 15 }}>
                <V style={styles.image}>
                    <T textAlign="center" h={1}>
                        {name[0].toUpperCase()}
                    </T>
                </V>
                <V>
                    <T h={1}>Dân chơi {name}</T>
                    <T>Rất đẳng cấp</T>
                </V>
            </V>
            <________________________Line________________________ />

            <ScrollView showsVerticalScrollIndicator={false} >


                < ________________________Spacer________________________ h={4} />

                <T h={2}>Cài đặt</T>
                <DefaultButton
                    onPress={() => { }}
                    style={{ borderRadius: 0 }}
                    rippleColor={colors.border}
                >
                    <V style={styles.option}>
                        <V style={{ ...global.row }}>
                            <T>💸  Phương thức thanh toán</T>
                        </V>
                        <T fontSize={20}>{">"}</T>
                    </V>
                </DefaultButton>

                <DefaultButton
                    onPress={() => { }}
                    style={{ borderRadius: 0 }}
                    rippleColor={colors.border}
                >
                    <V style={styles.option}>
                        <V style={{ ...global.row }}>
                            <T>🥷  Đăng nhập & bảo mật</T>
                        </V>
                        <T fontSize={20}>{">"}</T>
                    </V>
                </DefaultButton>

                <DefaultButton
                    onPress={() => { }}
                    style={{ borderRadius: 0 }}
                    rippleColor={colors.border}
                >
                    <V style={styles.option}>
                        <V style={{ ...global.row }}>
                            <T>🤐  Quyền riêng tư & chia sẻ</T>
                        </V>
                        <T fontSize={20}>{">"}</T>
                    </V>
                </DefaultButton>

                < ________________________Spacer________________________ h={3} />

                <T h={2}>Hỗ trợ</T>
                <DefaultButton
                    onPress={() => { }}
                    style={{ borderRadius: 0 }}
                    rippleColor={colors.border}
                >
                    <V style={styles.option}>
                        <V style={{ ...global.row }}>
                            <T>🤙  Liên hệ & gửi phản hồi</T>
                        </V>
                        <T fontSize={20}>{">"}</T>
                    </V>
                </DefaultButton>

                < ________________________Spacer________________________ h={3} />

                <T h={2}>Pháp lý</T>
                <DefaultButton
                    onPress={() => { }}
                    style={{ borderRadius: 0 }}
                    rippleColor={colors.border}
                >
                    <V style={styles.option}>
                        <V style={{ ...global.row }}>
                            <T>🧻  Điều khoản dịch vụ</T>
                        </V>
                        <T fontSize={20}>{">"}</T>
                    </V>
                </DefaultButton>

                <DefaultButton
                    onPress={() => { }}
                    style={{ borderRadius: 0 }}
                    rippleColor={colors.border}
                >
                    <V style={styles.option}>
                        <V style={{ ...global.row }}>
                            <T>🔏  Chính sách quyền riêng tư</T>
                        </V>
                        <T fontSize={20}>{">"}</T>
                    </V>
                </DefaultButton>
            </ScrollView>
            <CompensateTabBar />
        </V>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.margin,
        backgroundColor: 'white'
    },
    image: {
        width: 63,
        height: 63,
        backgroundColor: "red",
        borderRadius: 100,
        ...global.center
    },
    option: {
        paddingVertical: 15,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        ...global.center,
        ...global.rowBetween
    }
})

export default ProfileScreen;
