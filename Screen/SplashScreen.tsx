import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import styles from "../styles/splashStyles";

const SplashScreen = ({ navigation }: any) => {
    const username = useSelector((state: RootState) => state.user.user.userInfo.user.name);
    // State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            // Check if user_id is set or not
            // If not then send for Authentication
            // else send to Home Screen
            navigation.replace(username === null ? 'Auth' : 'DrawerNavigationRoutes');
        }, 1000);
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/splashimage.png')}
                style={styles.image}
            />
        </View>
    );
};

export default SplashScreen;