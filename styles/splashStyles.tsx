import { StyleSheet } from "react-native";

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

export default styles;