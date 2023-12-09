// Import React and Component
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import styles from '../styles/homeScreen';

const HomeScreen = () => {
    const username = useSelector((state: RootState) => state.user.user.userInfo.user.name);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <View
                    style={styles.welcomeContainer}>
                    <Text
                        style={styles.welcomeText}>
                        Welcome {username}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;