import { useEffect, useState, useRef } from "react";

import { FlatList, ActivityIndicator, Alert } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import { _userId, client } from "../../context/context";

// styles import
import { spacing, global, colors } from "../../constants/constants";

import { GET_SINGLE_COURT, GET_COMMENTS } from "../../schemas/schemas";

// atoms import
import {
    T,
    V,
    Button,
    DefaultButton,
    ________________________Line________________________,
    ________________________Spacer________________________
} from "../../atoms/Atoms";


// component import
import CommentCard from "../../components/Global/CommentCard";
import BottomBar from "../../components/Global/BottomBar";

import RenderHeader from '../../components/User/CourtDetailScreen/RenderHeader'
import { windowWidth } from "../../context/context";

function CourtDetailScreen({ route, navigation }) {
    const { _courtId } = route.params;
    const isFocused = useIsFocused()

    const [singleCourtData, setSingleCourtData] = useState(null)

    const [comments, setComments] = useState([])

    async function getSingleCourt() {
        const { data, loading, error } = await client.query({
            query: GET_SINGLE_COURT,
            variables: {
                "courtId": _courtId
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })
        setSingleCourtData(data.singleCourt)
    }

    async function getCourtComments() {
        const { data, loading, error } = await client.query({
            query: GET_COMMENTS,
            variables: {
                "courtId": _courtId,
                params: {
                    start: 0,
                    end: 5
                }
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        setComments(data.getComments)
    }

    useEffect(() => {
        getCourtComments()
    }, [isFocused])

    useEffect(() => {
        getSingleCourt()
    }, [])

    return (
        <V style={{ flex: 1, backgroundColor: 'white' }}>
            {singleCourtData === null ? <V style={{flex: 1, ...global.center}}><ActivityIndicator size="large" /></V> :
                <>
                    <FlatList
                        data={comments}
                        ListHeaderComponent={() => <RenderHeader court={singleCourtData} navigation={navigation} />}
                        renderItem={({ item }) => <CommentCard comment={item} />}
                        keyExtractor={(item) => item._id}
                        // ListEmptyComponent={sad face nothing here:<}
                        ListFooterComponent={() => (
                            <V style={{ ...global.center, margin: spacing.margin }}>
                                <DefaultButton onPress={() => {
                                    navigation.navigate('Comments', {
                                        _courtId: _courtId,
                                    })
                                }}>
                                    <V style={{
                                        ...global.border,
                                        ...global.center,
                                        padding: 7,
                                        borderRadius: spacing.brS,
                                        width: windowWidth - spacing.margin * 2
                                    }}>
                                        <T color={colors.primary}>Xem tất cả / để lại đánh giá</T>
                                    </V>
                                </DefaultButton>
                            </V>
                        )}
                        // onRefresh={}
                        // onEndReached={} load more shit
                        initialNumToRender={5}
                        showsVerticalScrollIndicator={false}
                    />
                    <BottomBar>
                        <V
                            style={{
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: spacing.brS - 5,
                            }}
                        >
                            <Button
                                onPress={
                                    () => {
                                        Alert.alert('Xin chào', 'Tính năng đặt cố định đang được phát triển, xin lỗi vì sự bất tiện này.')
                                    }
                                }
                                style={{ backgroundColor: colors.border }}
                            >
                                <T w={2}>Đặt cố định</T>
                            </Button>
                        </V>
                        <V style={{ borderWidth: 1, borderColor: "transparent" }}>
                            <Button
                                onPress={
                                    () => navigation.navigate("SingleBooking", {
                                        _courtId: _courtId,
                                        pricePerHour: singleCourtData.pricePerHour,
                                        court: JSON.stringify(singleCourtData)
                                    })
                                }
                                style={{ backgroundColor: colors.primary }}
                                rippleColor="green"
                            >
                                <T w={2} color="white">  Đặt ngay  </T>
                            </Button>
                        </V>
                    </BottomBar>
                </>
            }
        </V>
    );
}


export default CourtDetailScreen;
