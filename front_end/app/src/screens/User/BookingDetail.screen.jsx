import { useState, useEffect } from "react";

import { ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native";

// styles import
import { spacing, global, colors } from "../../constants/constants";

// fixture import

import { imageHeight, windowWidth } from "../../context/context";

import { GET_SINGLE_BOOKING, CANCEL_BOOKING, GET_STATUS_CHECK_IN } from "../../schemas/schemas";
import { client } from "../../context/context";

// atoms import
import {
    T,
    V,
    Button,
    ________________________Line________________________,
    ________________________Spacer________________________,
    Section,
    DefaultButton,
    Modal
} from "../../atoms/Atoms";

import { displayTimeSelection, formatDate, reverseGap } from "../../middlewares/middlwares";

// component import
import BottomBar from "../../components/Global/BottomBar";
import ImageCarousel from '../../components/Global/ImageCarousel'
import LikeNShare from "../../components/Global/likeNShare";

import XMark from '../../../assets/icons/XMark.svg'


function BookingDetailScreen({ route, navigation }) {
    const { _bookingId } = route.params;
    const [check, setCheck] = useState(null)

    const [booking, setBooking] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    async function getSingleBooking() {
        const { data, loading, error } = await client.query({
            query: GET_SINGLE_BOOKING,
            variables: {
                "bookingId": _bookingId
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        setBooking(data.getSingleBooking)
    }

    useEffect(() => {
        getSingleBooking()
    }, [])

    if (booking === null) {
        return (
            <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V>
        )
    }

    const timeSelection = displayTimeSelection(booking.timeSelection)

    const price = booking.totalPrice

    const date = formatDate(new Date(booking.date * 1))

    async function checkIn() {
        const { data } = await client.query({
            query: GET_STATUS_CHECK_IN,
            variables: {
                "bookingId": _bookingId
            }
        })
            .catch(err => {
                console.log(JSON.stringify(err, null, 2))
                throw new Error('Error', err.message)
            })
        if (data.getStatusCheckin === false) {
            setCheck(false)
        } else {
            setCheck(true)
        }
    }

    async function cancel() {
        const { data } = await client.mutate({
            mutation: CANCEL_BOOKING,
            variables: {
                bookingId: _bookingId
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        if (data.cancelBooking === "Booking cancelled") {
            navigation.navigate('Home')
        } else {
            console.log('cannot cancel')
        }
    }

    return (
        <V style={{ flex: 1, backgroundColor: 'white' }}>
            <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <V style={{
                    backgroundColor: 'white',
                    borderRadius: spacing.brS,
                    padding: spacing.margin,
                    margin: spacing.margin,
                    ...global.shadow,
                }}>
                    <V
                        style={{
                            alignItems: 'flex-end',
                            backgroundColor: 'white',
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            hitSlop={20}
                        >
                            <XMark width={20} height={20} fill={colors.primary} />

                        </Pressable>
                    </V>

                    <________________________Spacer________________________ h={3} />

                    <V>
                        <T w={2} marginHorizontal={40} textAlign="center">Lưu ý: khi hủy đơn, bạn sẽ không thể nhận lại tiền cọc</T>
                        <________________________Spacer________________________ h={1} />

                        <Pressable
                            onPress={cancel}
                            style={{
                                padding: 7,
                                paddingHorizontal: 20,
                                borderRadius: spacing.brS,
                                ...global.center,
                                ...global.border,
                                backgroundColor: 'red'
                            }}>
                            <T color="white">Hủy đơn</T>
                        </Pressable>
                    </V>
                </V>

            </Modal >

            <ScrollView>
                <ImageCarousel image={booking.image} />
                <LikeNShare court={booking} />

                <________________________Spacer________________________ h={3} />

                <V style={styles.pad}>
                    <T h={2}>{booking.courtName}</T>
                    <T h={6}>{`${booking.address}`}</T>
                </V>

                <Section />

                <V style={styles.pad}>

                    <T h={4}>Thông tin đặt sân</T>
                    <________________________Spacer________________________ h={5} />

                    <V style={{ ...global.rowBetween }}>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Họ và tên</T>
                            <________________________Spacer________________________ h={6} />
                            <T>{booking.userName}</T>
                        </V>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Số điện thoại</T>
                            <________________________Spacer________________________ h={6} />
                            <T>{booking.userPhone}</T>

                        </V>
                    </V>
                    <________________________Line________________________ />
                    <V style={{ ...global.rowBetween }}>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Ngày</T>
                            <T>{date}</T>
                        </V>
                        <V style={{ flex: 1 }}>
                            <T w={2}>Thời gian</T>
                            <T>{timeSelection}</T>
                        </V>
                    </V>
                </V>

                <Section />
                <V style={styles.pad}>
                    <T h={4}>Tổng giá tiền</T>
                    <________________________Spacer________________________ h={5} />
                    <V style={{ ...global.rowBetween }}>
                        <T>Số lượng giờ: {`${Math.round((booking.timeSelection.length / 2) * 10) / 10} giờ`}</T>
                        <T w={2}>{`${Number(price).toLocaleString()} đ`}</T>
                    </V>
                    <________________________Line________________________ />

                    <T h={4}>Đã trả</T>
                    <________________________Spacer________________________ h={5} />
                    <V style={{ ...global.rowBetween }}>
                        <T>{`${Number(booking.depositedAmount).toLocaleString()} đ`}</T>
                        <T w={2}>Cần trả: {`${Number(booking.totalPrice - booking.depositedAmount).toLocaleString()} đ`}</T>
                    </V>
                </V>
                <Section />
                <V style={styles.pad}>
                    <T h={4}>Thanh toán</T>
                    <________________________Spacer________________________ h={5} />
                    <T>{booking.paymentMethod}</T>
                </V>
                <Section />


                <V style={styles.pad}>
                    <T>
                        Trải nghiệm của bạn thế nào?
                    </T>
                    <V style={{ ...global.center, margin: spacing.margin }}>
                        <DefaultButton onPress={() => {
                            navigation.navigate('Comments', {
                                _courtId: booking._courtId,
                            })
                        }}>
                            <V style={{
                                borderWidth: 1,
                                borderColor: colors.primary,
                                ...global.center,
                                padding: 7,
                                borderRadius: spacing.brS,
                                width: windowWidth - spacing.margin * 2
                            }}>
                                <T color={colors.primary}>Xem / để lại đánh giá</T>
                            </V>
                        </DefaultButton>
                    </V>
                </V>

                <Section />
                {check !== true ?
                    <>
                        <V style={{ ...styles.pad, ...global.center }}>
                            <Button
                                onPress={
                                    () => { setModalVisible(true) }
                                }
                                style={{ backgroundColor: colors.border }}
                            >
                                <T w={2} color="red">  Hủy đơn  </T>
                            </Button>
                        </V>
                        <Section />
                    </>
                    : null}
                <V style={styles.pad}>
                    {/* <V style={{ ...global.row, alignItems: 'center', gap: spacing.margin }}>
                        <T h={4} marginBottom={0}>Còn thắc mắc?</T>
                        <DefaultButton
                            onPress={() => { navigation.navigate('SingleChat') }}
                        >
                            <V style={{
                                padding: 7,
                                paddingHorizontal: 20,
                                borderWidth: 1,
                                borderRadius: spacing.brS,
                                borderColor: colors.primary,
                            }}>
                                <T color={colors.primary}>Liên hệ</T>
                            </V>
                        </DefaultButton>
                    </V>
                    <________________________Spacer________________________ h={2} /> */}

                    <________________________Line________________________ />
                    {check === false ? <T>Lưu ý: check in chưa thành công, vui lòng thử lại sau giờ đã đặt</T> : null}
                </V>

            </ScrollView>

            <BottomBar>
                <Pressable
                    style={{ ...styles.button, marginRight: 10 }}
                    onPress={
                        () => {
                            navigation.navigate("CourtDetail", {
                                _courtId: booking._courtId
                            })
                        }
                    }
                >
                    <T w={2}>  Đặt lại  </T>
                </Pressable>
                {check !== true ?
                    <Pressable
                        style={{ ...styles.button, backgroundColor: colors.primary, marginLeft: 10 }}
                        onPress={checkIn}
                        rippleColor="green"
                    >
                        <T w={2} color="white">  Check-in  </T>
                    </Pressable> :
                    <Pressable
                        style={{ ...styles.button, backgroundColor: '#77FFBE', marginLeft: 10 }}
                        rippleColor="green"
                    >
                        <T w={2}>  Thành công! </T>
                    </Pressable>
                }
            </BottomBar>
        </V >
    );
}

const styles = StyleSheet.create({
    pad: {
        padding: spacing.margin
    },
    absoluteButtons: {
        backgroundColor: 'white',
        ...global.center,
        width: 45,
        height: 45,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.primary,
        ...global.shadow
    },
    likeNShare: {
        position: 'absolute',
        ...global.row,
        gap: 15,
        top: imageHeight - (45 / 2),
        right: spacing.margin
    },
    contactButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: 'white',
        padding: 7,
        paddingHorizontal: 20,
        borderRadius: spacing.brS,
    },
    button: {
        flex: 1,
        backgroundColor: colors.border,
        paddingVertical: 15,
        borderRadius: spacing.brS,
        ...global.center,
    }
})


export default BookingDetailScreen;
