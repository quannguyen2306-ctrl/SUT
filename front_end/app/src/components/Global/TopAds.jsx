import React from 'react';
import { View, StyleSheet } from 'react-native';

import { windowWidth, aspectHeight } from '../../context/context';
import { V } from '../../atoms/Atoms';
import { colors } from '../../constants/constants';

import {adsImages} from '../../fixtures/fixtures'

import ImageCarousel from './ImageCarousel';

const TopAds = () => {

    return (
        <V style={styles.container}>
            <ImageCarousel image={adsImages} autoPlay={false}/>
        </V>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: aspectHeight,
        backgroundColor: colors.primary,
        overflow: 'hidden'
    }
})

export default TopAds;
