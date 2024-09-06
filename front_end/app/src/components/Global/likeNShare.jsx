import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';

import { V, T } from '../../atoms/Atoms';
import { global, spacing, colors } from '../../constants/constants';

import { imageHeight, _userId, client } from '../../context/context';
import { CREATE_FAVORITE, DELETE_FAVORITE, IS_FAVORITE } from '../../schemas/schemas';

import { openMapsApp } from '../../middlewares/middlwares';

import Location from '../../../assets/icons/Location.svg'
import HeartSolid from '../../../assets/icons/HeartSolid.svg'
import Heart from '../../../assets/icons/Heart.svg'

const LikeNShare = ({ court }) => {
    const [favorite, setFavorite] = useState(false)


    async function handleFavorite() {
        if (favorite === false) {
            const { data, loading, error } = await client.mutate({
                mutation: CREATE_FAVORITE,
                variables: {
                    "userId": _userId,
                    "courtId": court._courtId
                }
            }).catch(err => {
                console.log(JSON.stringify(err, null, 2))
                throw new Error('Error', err.message)
            })
            console.log(data)
            if (data.createFavorite === 'Favorite court added') {
                setFavorite(true)
            }
        } else {
            const { data, loading, error } = await client.mutate({
                mutation: DELETE_FAVORITE,
                variables: {
                    "userId": _userId,
                    "id": court._id
                }
            }).catch(err => {
                console.log(JSON.stringify(err, null, 2))
                throw new Error('Error', err.message)
            })
            console.log(data)

            if (data.deleteFavorite === 'Favorite court removed') {
                setFavorite(false)
            };
        }


    }

    async function isFavorite() {

        const { data, loading, error } = await client.query({
            query: IS_FAVORITE,
            variables: {
                "userId": _userId,
                "id": court._id
            }
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        })

        if (data.isFavorite === true) {
            setFavorite(true)
        }


    }

    useEffect(() => {
        isFavorite()
    }, [])

    return (
        <SafeAreaView style={styles.likeNShare}>
            <Pressable onPress={() => {
                openMapsApp(court.address)
            }}
                style={styles.absoluteButtons}
            >
                <Location width={20} height={20} fill={colors.primary} />
            </Pressable>
            <Pressable
                onPress={handleFavorite}
                style={styles.absoluteButtons}
            >
                {favorite == true ?
                    <HeartSolid width={20} height={20} fill={colors.primary} />
                    : <Heart width={20} height={20} fill={colors.primary} />
                }


            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    absoluteButtons: {
        backgroundColor: 'white',
        ...global.center,
        width: 45,
        height: 45,
        borderRadius: 100,
        // ...global.border,
        ...global.shadow,

    },
    likeNShare: {
        position: 'absolute',
        ...global.row,
        gap: 15,
        zIndex: 99999,
        top: imageHeight - (45 / 2),
        right: spacing.margin,

    },
})

export default LikeNShare;
