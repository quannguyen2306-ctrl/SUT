import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Pressable, Alert, Platform } from 'react-native';

import { colors, global, spacing } from '../../constants/constants';

import {
    Button,
    T,
    V,
    ________________________Line________________________
} from '../../atoms/Atoms'

import { reverseGap, seperateArrays } from '../../middlewares/middlwares';


import BottomBar from '../../components/Global/BottomBar'
import ChooseTime from '../../components/User/SingleBookingScreen/ChooseTime';
import { windowWidth } from '../../context/context';

import RNEventSource from "react-native-event-source";

const SingleBookingScreen = ({ route, navigation }) => {
    const { _courtId, court } = route.params;
    const [date, setDate] = useState(new Date())
    const [selecting, setSelecting] = useState(date)
    const scrollRef = useRef();

    const courtData = JSON.parse(court)

    useEffect(() => {
        const url = `https://api-d2ogvmxflq-as.a.run.app/api/v1/rest/availability/?_courtId=${_courtId}&day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`

        const eventSource = new RNEventSource(
            url,
            {
                headers: {
                    Connection: "keep-alive",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );

        eventSource.addEventListener('message', (event) => {
            const array = JSON.parse(event.data)[0].availability
            const a = array.sort(function (a, b) { return a - b })
            const arr = calculateGap(a)
            setAvailabilityArray(seperateArrays(arr))
        });


        return () => {
            eventSource.removeAllListeners();
            eventSource.close();
        };
    }, [date]);

    const [availabilityArray, setAvailabilityArray] = useState([])

    const [selectedButtons, setSelectedButtons] = useState([]);

    const price = selectedButtons.length * (courtData.pricePerHour / 2)

    const handleButtonClick = (buttonIndex) => {
        const newArray = Array.from(selectedButtons)
        newArray.sort(function (a, b) { return a - b });

        const index = newArray.indexOf(buttonIndex);

        if (index !== -1) {
            if (newArray.includes(buttonIndex - 1) && newArray.includes(buttonIndex + 1)) {
            } else {
                setSelectedButtons([
                    ...newArray.slice(0, index),
                    ...newArray.slice(index + 1),
                ]);
            }
        } else {
            if (
                newArray.length === 0 ||
                newArray.includes(buttonIndex - 1) ||
                newArray.includes(buttonIndex + 1)
            ) {
                setSelectedButtons([...newArray, buttonIndex]);
            } else {
                Alert.alert('Xin chào', 'Vui lòng chọn các ô khung giờ liên tiếp')
            }
        }
    };

    function sortArray(array) {
        return array.sort(function (a, b) { return a - b })
    }

    function calculateGap(gaps) {
        let gapArr = [];
        const start = new Date(courtData.workingHours.start)
        const end = new Date(courtData.workingHours.end)

        if (end > start) {
            const difference = Math.abs(end - start) / (1000 * 60); // return in minutes
            const n = difference / 30
            let current = start;
            for (let i = 0; i < n; i++) {
                let hourFromStart = parseFloat(current.getHours()) + parseFloat(current.getMinutes()) / 60
                let gap = hourFromStart * 2 + 1
                gapArr.push(gap)
                current.setMinutes(current.getMinutes() + 30)
            }
        } else {
            throw Error("Invalid startTime and endTime");
        }

        gapArr = gapArr.sort(function (a, b) { return a - b })

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const currentTimeFraction = hours + minutes / 60;

        const gapId = Math.ceil(currentTimeFraction * 2);

        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        let min = gapArr[0]

        if (date <= endOfToday && min < gapId) {
            min = gapId
        }

        const max = gapArr[gapArr.length - 1]
        const newArr = gaps.filter(item => item >= min && item <= max);
        console.log(newArr)
        return newArr

    }

    async function handleProceed() {
        if (selectedButtons.length > 1) {
            navigation.navigate('Payment', {
                timeSelection: sortArray(selectedButtons),
                date: String(date),
                court: court,
            })
        } else {
            Alert.alert('Xin chào', 'Vui lòng chọn trên 2 ô (1 tiếng) để tiếp tục')
        }
    }

    function nextDays() {
        let datesArray = [];
        for (let i = 3; i > 0; i--) {
            let previousDate = new Date(date);
            previousDate.setDate(date.getDate() - i);
            datesArray.push(previousDate);
        }
        datesArray.push(date);
        for (let i = 1; i <= 3; i++) {
            let nextDate = new Date(date);
            nextDate.setDate(date.getDate() + i);
            datesArray.push(nextDate);
        }
        return datesArray;
    }

    const dateArray = nextDays()
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    function changeDate(item) {
        setSelecting(item)
        setDate(item)
    }

    useEffect(() => {
        setSelecting(date)
        scrollRef.current?.scrollTo({
            x: 65 * 2,
            // animated: true,
        });
    }, [date])

    return (
        <V style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'white' }}>
            {/* <TopAds /> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                <V style={{ ...global.center, ...global.row, alignItems: 'flex-end', marginHorizontal: spacing.margin, marginTop: spacing.margin, gap: 10 }}>
                    <V style={{ gap: 10, ...global.center }}>
                        <ChooseTime date={date} setDate={setDate} />
                        <T color={colors.primary} w={2}>Chọn ngày</T>
                    </V>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ref={scrollRef}
                    >
                        {dateArray.map((item, index) => (
                            <Pressable
                                key={index}

                                onPress={() => changeDate(item)}

                                style={[
                                    styles.dateButton,
                                    item.getDate() == selecting.getDate() ? { backgroundColor: colors.primary, borderColor: colors.primary } : null
                                ]}>
                                <V
                                    style={{ backgroundColor: 'white', width: 65, ...global.center, height: 30 }}
                                >
                                    <T
                                        w={1}
                                        style={item.getDate() == selecting.getDate() ? { color: colors.primary } : null}
                                    >{item.getDate() == selecting.getDate() ? 'L.Chọn' : daysOfWeek[item.getDay()]}
                                    </T>
                                </V>
                                <V style={{ height: 50, ...global.center }}>
                                    <T h={1} marginBottom={5} style={item.getDate() == selecting.getDate() ? { color: 'white' } : null}>{item.getDate()}</T>
                                </V>
                            </Pressable>
                        ))}
                    </ScrollView>
                </V>
                {availabilityArray !== null ? availabilityArray.map((array, index) => {
                    const firstItem = reverseGap(array[0])
                    const lastItem = reverseGap(array[array.length - 1])
                    const firstItemStart = `${firstItem.startHour}:${String(firstItem.startMinute).padStart(2, "0")}`
                    const lastItemEnd = `${lastItem.endHour}:${String(lastItem.endMinute).padStart(2, "0")}`

                    if (array.length > 1) {
                        return (
                            <V key={index}>
                                <V style={{ marginHorizontal: spacing.margin }}>
                                    <________________________Line________________________ />

                                    {array.length > 1 ?
                                        <T h={2}>{firstItemStart} - {lastItemEnd}</T>
                                        : null
                                    }
                                </V>
                                <V style={styles.gridContainer}>
                                    {array.map((item, index) => {
                                        const avail = reverseGap(item)
                                        const start = `${avail.startHour}:${String(avail.startMinute).padStart(2, "0")}`
                                        const end = `${avail.endHour}:${String(avail.endMinute).padStart(2, "0")}`
                                        return (
                                            <Pressable
                                                key={index}
                                                onPress={() => handleButtonClick(item)}
                                                style={[
                                                    styles.gridItem,
                                                    selectedButtons.includes(item) ? { backgroundColor: colors.primary } : null
                                                ]}>
                                                <T
                                                    style={selectedButtons.includes(item) ? { color: 'white' } : { color: 'black' }}
                                                >{start} - {end}</T>
                                            </Pressable>
                                        )
                                    }
                                    )}
                                </V>
                            </V>
                        )
                    }
                }
                ) : null}
            </ScrollView>
            <BottomBar>
                <T h={4} marginBottom={0}>{`${Number(price).toLocaleString()} đ`}</T>
                <V style={{ borderWidth: 1, borderColor: "transparent" }}>
                    <Button
                        onPress={handleProceed}
                        style={{ backgroundColor: colors.primary }}
                        rippleColor="green"
                    >
                        <T w={2} color="white">
                            Đặt ngay
                        </T>
                    </Button>
                </V>
            </BottomBar>
        </V >
    );

};

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width: windowWidth / 3 - spacing.margin - 5,
        marginVertical: 10,
        padding: 7,
        ...global.center,
        borderRadius: spacing.brS,
        ...global.border
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: (windowWidth - (0.315 * windowWidth) * 3 - 2) / 2,
        padding: 16,
    },
    gridItem: {
        width: '31.5%',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    dateButton: {
        backgroundColor: colors.border,
        marginRight: 10,
        height: 80,
        width: 65,
        alignItems: 'center',
        ...global.border,
        borderColor: colors.border,
        borderWidth: 2,
        overflow: 'hidden',
        borderRadius: spacing.brS
    }

})

export default SingleBookingScreen;
