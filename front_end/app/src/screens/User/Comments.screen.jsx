import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import {
    V,
    T,
    ________________________Spacer________________________,
    Input,
    DefaultButton,
    Modal
} from '../../atoms/Atoms';

import { GET_COMMENTS, CREATE_COMMENTS } from "../../schemas/schemas";

import { _userId, client } from '../../context/context';

import { global, spacing, colors } from '../../constants/constants';

import CommentCard from "../../components/Global/CommentCard";
import TopAds from '../../components/Global/TopAds'

import XMark from '../../../assets/icons/XMark.svg'
import Star from '../../../assets/icons/Star.svg'


import { windowWidth } from '../../context/context';

const CommentsScreen = ({ route, navigation }) => {
    const { _courtId } = route.params;
    const [comment, setComment] = useState('');
    const [commentData, setCommentData] = useState(null)
    const [rating, setRating] = useState(0);

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
    };


    const [modalVisible, setModalVisible] = useState(false)


    async function getCourtComments() {
        try {
            console.log('called comment')
            const { data, loading, error } = await client.query({
                query: GET_COMMENTS,
                variables: {
                    "courtId": _courtId,
                    params: {
                        start: 0,
                        end: 10
                    }
                }
            })

            setCommentData(data.getComments)

        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    useEffect(() => {
        getCourtComments()
    }, [])

    async function handleSubmit() {
        if (rating !== 0 && comment.length > 0) {

            try {

                const { data } = await client.mutate({
                    mutation: CREATE_COMMENTS,
                    variables: {
                        body: {
                            "_courtId": _courtId,
                            "_userId": _userId,
                            "rating": rating,
                            "comment": comment,
                            "commentDate": String(new Date())
                        }
                    },
                });

                if (data.createComment.length !== '') {
                    setModalVisible(false)
                    setComment('')
                    setRating(0)
                    navigation.goBack()
                }
            }
            catch (e) {
                console.log(JSON.stringify(e, null, 2))
            }
        }
    }

    return (
        <V style={{ flex: 1 }}>

            <TopAds />

            {commentData === null ? <V style={{ flex: 1, ...global.center }}><ActivityIndicator size="large" /></V> :
                <>
                    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
                        <Pressable
                            onPress={() => Keyboard.dismiss()}
                            style={{ flex: 1, ...global.center }}
                            accessible={false}
                        >
                            <V style={{
                                backgroundColor: 'white',
                                borderRadius: spacing.brS,
                                width: windowWidth - spacing.margin * 2,
                                padding: spacing.margin,
                                ...global.shadow
                            }}>
                                <V
                                    style={{
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Pressable
                                        onPress={() => {
                                            setComment('')
                                            setRating(0)
                                            setModalVisible(false)
                                        }}
                                        hitSlop={20}
                                    >
                                        <XMark width={20} height={20} fill={colors.primary} />
                                    </Pressable>
                                </V>

                                <V style={{ padding: spacing.margin }}>
                                    <Input
                                        placeholder="Đánh giá của bạn"
                                        onChangeText={setComment}
                                        value={comment}
                                        autoFocus={true}
                                        blurOnSubmit={true}
                                        onSubmitEditing={handleSubmit}
                                    />

                                    <V style={{ ...global.center, ...global.row, marginVertical: 30, gap: 10 }}>
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <Pressable
                                                key={index}
                                                onPress={() => handleStarPress(index)}
                                            >
                                                <Star width={30} height={30} fill={index <= rating ? colors.primary : colors.border} />
                                            </Pressable>
                                        ))}
                                        <T>{rating}/5</T>
                                    </V>
                                    <Pressable
                                        onPress={handleSubmit}
                                        style={{
                                            padding: 7,
                                            paddingHorizontal: 20,
                                            borderRadius: spacing.brS,
                                            ...global.center,
                                            backgroundColor: colors.primary
                                        }}>
                                        <T color="white">Gửi</T>
                                    </Pressable>
                                </V>
                            </V>
                        </Pressable>
                    </Modal >

                    <Pressable
                        style={styles.searchContainer}
                        onPress={() => setModalVisible(true)}
                    >

                        <V style={{
                            backgroundColor: colors.border,
                            height: 50,
                            borderRadius: spacing.brS,
                            ...global.row,
                            alignItems: 'center',
                            paddingLeft: spacing.margin,
                            width: '100%'
                        }}>
                            <T color={colors.gray}>Đánh giá của bạn</T>
                        </V>
                    </Pressable>
                </>}
            <FlatList
                data={commentData}
                renderItem={({ item }) => <CommentCard comment={item} />}
                keyExtractor={(item, index) => index}
                // ListEmptyComponent={sad face nothing here:<}
                // onRefresh={}
                // onEndReached={} load more shit
                initialNumToRender={10}
            // showsVerticalScrollIndicator={false}
            />
        </V>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        margin: spacing.margin,
        ...global.row,
        gap: 10
    },
    inputStyle: {
        flex: 5
    },
    submitButton: {
        backgroundColor: colors.primary,
        flex: 1,
        ...global.center,
        borderRadius: spacing.brS
    },
})

export default CommentsScreen;
