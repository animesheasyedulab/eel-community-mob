import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: '10%',
        paddingTop: '10%',
        paddingBottom: '18%',
        margin: '10%',
        backgroundColor: 'white',
    },
    headText: {
        fontSize: 20,
        fontWeight: "700",
        color: 'black'
    },
    normalText: {
        fontSize: 15,
        fontWeight: "400",
        color: '#353535',
        marginTop: '2%'
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: '2%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: 'black',
    },
    errorText: {
        fontWeight: "700",
        color: 'red',
        marginVertical: 5,
    },
    radioContainer: {
        paddingRight: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: "wrap",
    },
    dobContainer: {
        paddingLeft: 5,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        marginVertical: '2%',
    },
    buttonContainer: {
        marginTop: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F80ED',
        height: '6%'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    marginTop: {
        marginTop: '5%',
    },
    verticalMargin: {
        marginVertical: '2%'
    },
});

export default styles;