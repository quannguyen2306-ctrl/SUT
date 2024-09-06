import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const ProfileDetailScreen = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.margin,
        backgroundColor: 'white'
    },
})

export default ProfileDetailScreen;
