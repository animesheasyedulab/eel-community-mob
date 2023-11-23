// Import React and Component
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        padding: 16,
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 16,
        color: 'black',
    },
});

export default HomeScreen;