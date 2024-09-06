// basic imports
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { windowWidth } from "../../context/context";
import { gql, useQuery } from "@apollo/client";

// styles import
import { spacing, global, colors } from "../../constants/constants";

// atoms import
import {
    T,
    V,
    ________________________Spacer________________________,
    ________________________Line________________________,
    Modal,
    Button,
    Input,
} from "../../atoms/Atoms";

import { courts, sports } from "../../fixtures/fixtures";
import { GET_COURTS } from "../../schemas/schemas";

import { client } from "../../context/context";

// component import
import Chip from "../../components/User/HomeScreen/Chip";
import CourtCard from "../../components/Global/CourtCard";
import TopAds from "../../components/Global/TopAds";
import SearchFilter from "../../components/Global/Search_Filter";
import CompensateTabBar from "../../components/Global/CompensateTabBar";

import XMark from "../../../assets/icons/XMark.svg";
import Calendar from "../../../assets/icons/Calendar.svg";
import Location from "../../../assets/icons/Location.svg";


function HomeScreen({ navigation }) {
    const scrollRef = useRef();

    const [params, setParams] = useState({ start: 0, end: 5 });
    const [loadingData, setLoadingData] = useState(true);
    const [courtData, setCourtData] = useState(null);

    const updateParams = () => {
        setLoadingData(true);

        setParams((prevParams) => ({
            start: prevParams.start + 5,
            end: prevParams.end + 5
        }));
    };

    async function getCourts() {
        const { data, loading, error } = await client.query({
            query: GET_COURTS,
            variables: {
                "params": params
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        setCourtData(data.courts)
        setLoadingData(false);

    }

    useEffect(() => {
        getCourts()
    }, [params])

    const [filter, setFilter] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [from, setFrom] = useState("9:30");
    const [to, setTo] = useState("10:30");

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "white" }}
        >
            <TopAds />
            <SearchFilter
                home={true}
                navigation={navigation}
                setFilterOn={setFilterOn}
            />

            <Modal
                modalVisible={filterOn}
                setModalVisible={setFilterOn}
                animationType="slide"
            >
                <V style={styles.modal}>
                    <V
                        style={{
                            padding: spacing.margin,
                            paddingTop: 15,
                            paddingBottom: 0,
                        }}
                    >
                        <V style={{ ...global.center, ...global.rowBetween }}>
                            <V>
                                <XMark width={20} height={20} fill="transparent" />
                            </V>
                            <T w={1} fontSize={16} marginBottom={0} textAlign="center">
                                Thứ tự
                            </T>
                            <Pressable
                                onPress={() => {
                                    setFilterOn(false);
                                }}
                                hitSlop={20}
                            >
                                <XMark width={20} height={20} fill={colors.primary} />
                            </Pressable>
                        </V>
                    </V>


                    <________________________Line________________________
                        style={{ marginTop: 15 }}
                    />

                    <V style={{ padding: spacing.margin, paddingTop: 0 }}>
                        <T h={4}>Theo thời gian</T>
                        <________________________Spacer________________________ h={5} />
                        <V style={{ ...global.row, gap: 15, alignItems: "center" }}>
                            <Pressable style={styles.button}>
                                <Calendar width={20} height={20} fill="white" />
                            </Pressable>
                            <T w={2}>24/2/2024 - T7</T>
                        </V>
                        <________________________Spacer________________________ h={3} />
                        <V style={{ ...global.center, gap: 10, ...global.rowBetween }}>
                            <Pressable style={styles.timeInputs}>
                                <T h={6}>Từ</T>
                                <T w={2}>{from}</T>
                            </Pressable>
                            <V style={{ height: 1, flex: 2, backgroundColor: "black" }}></V>
                            <Pressable style={styles.timeInputs}>
                                <T h={6}>Đến</T>
                                <T w={2}>{to}</T>
                            </Pressable>
                        </V>

                        <________________________Line________________________ />

                        <T h={4}>Theo địa điểm</T>
                        <________________________Spacer________________________ h={5} />

                        <V style={{ ...global.row }}>
                            <T lineHeight={20}>
                                <T w={3}>Địa điểm của bạn: </T>
                                208, Nguyễn Hữu Cảnh, P22, quận Bình Thạnh, Thành phố Hồ Chí
                                Minh
                            </T>
                        </V>

                        <________________________Spacer________________________ h={4} />

                        <Pressable onPress={() => { }} style={styles.chooseLocation}>
                            <T>Chọn địa điểm</T>
                            <Location height={15} width={15} fill={colors.primary} />
                        </Pressable>
                    </V>
                </V>
            </Modal>

            <________________________Spacer________________________ h={1} />
            <________________________Spacer________________________ h={1} />
            <________________________Spacer________________________ h={6} />

            <T h={3} marginLeft={spacing.marginHome} marginBottom={0}>
                Được đề xuất
            </T>

            {courtData === null ? <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V> : <>

                <FlatList
                    ref={scrollRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={() => console.log('i reached end')}
                    data={courtData}
                    initialNumToRender={5}
                    renderItem={({ item }) => (
                        <V style={styles.boxShadow}>
                            <CourtCard court={item} home={true} navigation={navigation} />
                        </V>
                    )}
                    keyExtractor={(item, index) => String(index)}
                    // ListEmptyComponent={() => <T>Nothing here:{'<'}</T>}
                    ListHeaderComponent={() => <View style={{ width: 10 }}></View>}
                    ListFooterComponent={() => (
                        <V
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        >
                            {loadingData && <ActivityIndicator size="large" />}
                        </V>
                    )}
                    snapToAlignment="start"
                    decelerationRate={"fast"}
                    snapToInterval={windowWidth - spacing.marginHome - spacing.margin * 2}
                    onScrollToIndexFailed={() => console.log("failed to scroll to index")}
                // onRefresh={}
                />

            </>}

            <________________________Spacer________________________ h={4} />

            <T h={3} marginLeft={spacing.marginHome} marginBottom={0}>
                Gần đây
            </T>
            {courtData === null ? <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V> : <>

                <FlatList
                    ref={scrollRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={() => console.log('i reached end')}
                    data={courtData}
                    initialNumToRender={5}
                    renderItem={({ item }) => (
                        <V style={styles.boxShadow}>
                            <CourtCard court={item} home={true} navigation={navigation} />
                        </V>
                    )}
                    keyExtractor={(item, index) => String(index)}
                    // ListEmptyComponent={() => <T>Nothing here:{'<'}</T>}
                    ListHeaderComponent={() => <View style={{ width: 10 }}></View>}
                    ListFooterComponent={() => (
                        <V
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        >
                            {loadingData && <ActivityIndicator size="large" />}
                        </V>
                    )}
                    snapToAlignment="start"
                    decelerationRate={"fast"}
                    snapToInterval={windowWidth - spacing.marginHome - spacing.margin * 2}
                    onScrollToIndexFailed={() => console.log("failed to scroll to index")}
                // onRefresh={}
                />
            </>}

            <CompensateTabBar />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    boxShadow: {
        backgroundColor: "white",
        ...global.shadow,
        borderRadius: spacing.brS,
        marginTop: spacing.marginHome,
        marginBottom: spacing.margin,
        marginLeft: spacing.marginHome - 10,
        marginRight: 5,
    },
    modal: {
        backgroundColor: "white",
        width: windowWidth - spacing.margin * 2,
        borderRadius: spacing.brS,
        ...global.shadow,
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 100,
        ...global.center,
    },
    timeInputs: {
        flex: 5,
        ...global.border,
        borderColor: colors.gray,
        borderWidth: 0.8,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    chooseLocation: {
        width: 150,
        ...global.border,
        borderColor: colors.gray,
        borderRadius: 10,
        padding: 15,
        ...global.center,
        gap: 5,
        ...global.row,
    },
});

export default HomeScreen;
