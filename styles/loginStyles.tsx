import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: '10%',
        margin: '10%',
        backgroundColor: 'white',
        //aspectRatio: 1/2,
    },
    headText: {
        fontSize: 20,
        fontWeight: "700",
        color: 'black'
    },
    text1: {
        fontSize: 15,
        fontWeight: "700",
    },
    text2: {
        color: '#262626'
    },
    emailContainer: {
        marginTop: '5%',
    },
    emailText: {
        fontWeight: "600",
        color: '#202020'
    },
    inputEmail: {
        paddingLeft: 10,
        paddingRight: 10,
        padding: 5,
        marginTop: '2%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    passwordContainer: {
        marginTop: '5%',
    },
    passwordInputContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: '2%',
        paddingHorizontal: '2%'
    },
    inputPassword: {
        flex: 1,
        paddingHorizontal: '2%',
        padding: 5,
        marginTop: '2%',
    },
    rememberForgotContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: 'center',
        marginTop: '3%',
    },
    checkboxContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 1,
        //width:10,
        // height: 2,
        width: 25,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
        //paddingHorizontal: '1%'
        //paddingLeft:5
    },
    forgotText: {
        color: '#2F80ED'
    },
    signinContainer: {
        marginTop: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
        //borderColor: 'black',
        backgroundColor: '#2F80ED',
        height: '6%'
    },
    signinText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    orImage: {
        width: '100%',
        marginVertical: '3%',
    },
    contGogContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: '2%',
    },
    contGogText: {
        color: '#000000',
        fontWeight: '700',
    },
    newJoinContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: '5%',
        paddingVertical: '5%',
        //height: '6%',
    },
    newJoinText1: {
        color: '#353535',
        fontWeight: '600',
        fontSize: 15,
    },
    newJoinText2: {
        color: '#2F80ED',
        fontWeight: '600',
        fontSize: 15,
    },
});

export default styles;