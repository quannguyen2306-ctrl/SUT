import { useMemo, useState } from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';

import { _userId, client, userName, userPhone } from "../../context/context";
import { global, spacing, colors } from "../../constants/constants";

import {
    V,
    T,
    Section,
    Button,
    ________________________Spacer________________________,
    ________________________Line________________________,
} from "../../atoms/Atoms";

import { CREATE_BOOKING, UPDATE_AVAILABILITY } from "../../schemas/schemas";


import BottomBar from '../../components/Global/BottomBar'
import CourtCardSmall from "../../components/Global/CourtCardSmall";
import { DefaultButton } from "../../atoms/Atoms";

import { displayTimeSelection, reverseGap } from "../../middlewares/middlwares";


function PaymentScreen({ route, navigation }) {
    const { timeSelection, date, court } = route.params;
    const selectedDate = new Date(date)
    const courtData = JSON.parse(court)

    const time = displayTimeSelection(timeSelection)
    const [selectedId, setSelectedId] = useState(1);
    const price = timeSelection.length * (courtData.pricePerHour / 2) * selectedId

    const radioButtons = useMemo(() => ([
        {
            id: 1,
            label: `Toàn bộ (100%)`,
            description: " ",
            value: 100,
            color: colors.primary,
            containerStyle: { width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between' },
        },
        {
            id: courtData.depositPercentage / 100,
            label: `Đặt cọc (${courtData.depositPercentage}%)`,
            value: courtData.depositPercentage,
            color: colors.primary,
            containerStyle: { width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between' },
        }
    ]), []);

    async function updateAvailability() {
        const { data } = await client.mutate({
            mutation: UPDATE_AVAILABILITY,
            variables: {
                "courtId": courtData._courtId,
                "body": {
                    "day": selectedDate.getDate(),
                    "month": selectedDate.getMonth() + 1,
                    "year": selectedDate.getFullYear(),
                    "gapList": timeSelection,
                    "condition": "add"
                }
            }
        }).catch(err => {
            console.log(err)
        })

        console.log('updated', data)
    }

    async function handleBook() {
        const date = String(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), reverseGap(timeSelection[0]).startHour, reverseGap(timeSelection[0]).startMinute))
        const body =  {
            _bookerId: _userId,
            _courtId: courtData._courtId,
            userName: userName,
            userPhone: userPhone,

            timeSelection: timeSelection,
            date: date,

            totalPrice: timeSelection.length * (courtData.pricePerHour / 2),
            depositedAmount: price,
            paymentMethod: "VNPay"
        }

        updateAvailability()

        const { data } = await client.mutate({
            mutation: CREATE_BOOKING,
            variables: {
                body: body
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        if (data.createBooking.length > 0) {
            navigation.navigate('Bookings')
        }
    }


    return (
        <V style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <V style={styles.pad}>
                    <CourtCardSmall court={courtData} />
                </V>


                <Section />

                <V style={styles.pad}>
                    <T h={4}>Thông tin đặt sân</T>
                    <________________________Spacer________________________ h={5} />

                    <V style={{ ...global.rowBetween }}>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Họ và tên</T>
                            <________________________Spacer________________________ h={6} />
                            <T>{userName}</T>
                        </V>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Số điện thoại</T>
                            <________________________Spacer________________________ h={6} />
                            <T>{userPhone}</T>

                        </V>
                    </V>

                    <________________________Line________________________ />

                    <V style={{ ...global.rowBetween }}>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Ngày</T>
                            <________________________Spacer________________________ h={6} />
                            <T>{`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`}</T>
                        </V>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Thời gian</T>
                            <________________________Spacer________________________ h={6} />
                            <T>{time}</T>

                        </V>
                    </V>

                </V>

                <Section />

                <V style={styles.pad}>
                    <T h={4}>Tổng giá tiền</T>
                    <________________________Spacer________________________ h={5} />
                    <V style={{ ...global.rowBetween }}>
                        <T>{`${Number(courtData.pricePerHour).toLocaleString()} đ x ${Math.round((timeSelection.length / 2) * 10) / 10} giờ`} {selectedId != 1 ? `x ${selectedId * 100}%` : null}</T>
                        <T w={2}>{`${Number(price).toLocaleString()} đ`}</T>
                    </V>
                </V>
                <Section />

                <V style={{ ...styles.pad }}>
                    <T h={4}>Sân</T>
                    <________________________Spacer________________________ h={5} />
                    <T>Số: 1</T>
                </V>
                <Section />

                <V style={{ ...styles.pad }}>
                    <T h={4}>Thanh toán</T>
                    <________________________Spacer________________________ h={5} />
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                        borderColor={colors.primary}
                    />
                </V>

            </ScrollView>

            <BottomBar>
                <T h={4} marginBottom={0}>{`${Number(price).toLocaleString()} đ`}</T>
                <V style={{ borderWidth: 1, borderColor: "transparent" }}>
                    <Button
                        onPress={handleBook}
                        style={{ backgroundColor: colors.primary }}
                        rippleColor="green"
                    >
                        <T w={2} color="white">
                            Thanh toán
                        </T>
                    </Button>
                </V>
            </BottomBar>
        </V>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: spacing.margin,
    },
    pad: {
        padding: spacing.margin,
        paddingVertical: 25

    },
});

export default PaymentScreen;
