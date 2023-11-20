import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const SplashScreen = ({navigation}: any) => {
    // State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            // Check if user_id is set or not
            // If not then send for Authentication
            // else send to Home Screen
            AsyncStorage.getItem('user_id').then((value: any) => navigation.replace(value === null ? 'Auth' : 'LoginScreen'),//'DrawerNavigationRoutes'),
            );
        }, 1000);
    }, []);
    return(
        <View style={styles.container}>
            <Image
            source={require('../assets/splashimage.png')}
            style={styles.image}
            />
            {/*<ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
    />*/}
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    image: {
        width: '90%',
        resizeMode: 'contain',
        margin: 30
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});